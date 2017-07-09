// ----- Ember modules -----
import Helper from 'ember-helper'
import service from 'ember-service/inject'
import observer from 'ember-metal/observer'

// ----- Ember addons -----
import writable from 'ember-macro-helpers/writable'

// ----- Third-party libraries -----

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



export function convertTemp (temp, locale) {
  return isFahrenheit(locale)
    ? celsiusToFahrenheit(temp)
    : temp
}



export function formatTemp (temp, locale) {
  const effectiveTemp = convertTemp(temp, locale)
  return decorateTemp(effectiveTemp, locale)
}



export default Helper.extend({
  zen : service(),

  locale : writable('zen.state.settings.locale'),

  recomputeOnLocaleChange : observer('locale', function () {
    this.recompute()
  }),

  compute ([temp]) {
    const locale = this.get('locale')

    return formatTemp(temp, locale)
  },
})
