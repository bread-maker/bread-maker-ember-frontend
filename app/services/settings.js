// ----- Ember modules -----
import Service from 'ember-service'
import service from 'ember-service/inject'
// import {reads} from 'ember-computed'

// ----- Ember addon modules -----
import {
  and,
  or,
} from 'ember-awesome-macros'

// ----- Own modules -----
import promiseProxy from 'bread-maker-ember-frontend/macros/promise-proxy'



export default Service.extend({

  // ----- Services -----
  ajax   : service(),
  intl   : service(),
  moment : service(),



  // ----- Overridden properties -----



  // ----- Static properties -----
  localeDefault   : 'en-gb',
  timezoneDefault : 'UTC',



  // ----- Promises -----
  miscConfigPromise : null,
  miscConfigProxy   : promiseProxy('miscConfigPromise'),



  // ----- Computed properties -----
  locale   : or('miscConfigProxy.content.locale',   'localeDefault'),
  timezone : or('miscConfigProxy.content.timezone', 'timezoneDefault'),



  // ----- Overridden Methods -----



  // ----- Custom Methods -----
  requestGlobalBakingConfig () {
    const ajax = this.get('ajax')
    return ajax.getGlobalBakingConfig()
  },



  requestMiscConfig () {
    const ajax = this.get('ajax')

    return ajax
      .getMiscConfig()
      .then(config => (this.applyMiscConfig(), config))
  },



  applyMiscConfig () {
    this.applyLocale()
    this.applyTimezone()
  },



  applyLocale (locale) {
    locale = locale || this.get('locale')
    const intl   = this.get('intl')
    const moment = this.get('moment')

    intl.setLocale(locale)
    moment.setLocale(locale)
  },



  applyTimezone (timezone) {
    timezone = timezone || this.get('timezone')

    const moment = this.get('moment')
    moment.setTimeZone(timezone)
  },



  setPassword (password, newPassword) {
    const ajax = this.get('ajax')

    return ajax.setPassword(password, newPassword)
  },



  setGlobalBakingConfig (attr, value) {
    const ajax      = this.get('ajax')
    const prefsNode = this.get('zen.state.settings')

    const effectiveValue = attr === 'maxTempDurationMins' ? value * 60 : value
    const effectiveAttr  = attr === 'maxTempDurationMins' ? 'maxTempDuration' : attr

    return ajax
      .setGlobalBakingConfig({[effectiveAttr] : effectiveValue})
      .then(response => (prefsNode.reset(attr), response))
  },



  setMiscConfig (attr, value) {
    const ajax = this.get('ajax')

    return ajax
      .setMiscConfig(attr, value)
      .then(config => this.applyMiscConfig(config))
  },



  // ----- Events and observers -----



  // ----- Tasks -----

})
