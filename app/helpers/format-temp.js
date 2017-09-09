// ----- Ember modules -----
import Helper from '@ember/component/helper'
// import { inject as service } from '@ember/service'
import { observer } from '@ember/object'

// ----- Ember addons -----
import writable from 'ember-macro-helpers/writable'

// ----- Third-party libraries -----
import _ from 'lodash'

// ----- Own modules -----




export function isFahrenheit (locale) {
  return locale === 'en'
}



export function celsiusToFahrenheit (temp) {
  return temp * 1.8 + 32
}



export function getUnit (locale) {
  return isFahrenheit(locale) ? 'F' : 'C'
}



export function decorateTemp (temp, locale) {
  const unit = getUnit(locale)

  return `${temp}°${unit}`
}



export function convertTemp (temp, locale, precision = 2) {
  const effectiveTemp =
    isFahrenheit(locale)
      ? celsiusToFahrenheit(temp)
      : temp

  return _.round(effectiveTemp, precision)
}



export function formatTemp (temp, locale, precision = 2) {
  const effectiveTemp = convertTemp(temp, locale, precision)
  return decorateTemp(effectiveTemp, locale)
}



export default Helper.extend({
  locale : writable('zen.state.settingsData.locale'),

  recomputeOnLocaleChange : observer('locale', function () {
    this.recompute()
  }),

  compute ([temp, precision = 2]) {
    const locale = this.get('locale')

    return formatTemp(temp, locale, precision)
  },
})
