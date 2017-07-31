// ----- Ember modules -----
import service from 'ember-service/inject'

// ----- Ember addons -----
import {Node, promiseAttr} from 'ember-zen'
// import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'
import divide from 'ember-awesome-macros/divide'
import or from 'ember-awesome-macros/or'

// ----- Third-party libraries -----
import RSVP from 'rsvp'

// ----- Own modules -----



export default Node.extend({

  // ----- Attributes -----
  attrs : {
    locale             : promiseAttr(),
    password           : promiseAttr(),
    globalBakingConfig : promiseAttr(),
    miscConfig         : promiseAttr(),
  },



  // ----- Services -----
  ajax   : service(),
  intl   : service(),
  moment : service(),



  // ----- Computed properties -----
  localeDefault   : 'en-gb',
  timezoneDefault : 'UTC',

  locale   : or('miscConfigResponse.locale',   'localeDefault'),
  timezone : or('miscConfigResponse.timezone', 'timezoneDefault'),

  maxTempBeforeTimer  : writable('globalBakingConfigResponse.maxTempBeforeTimer'),
  maxTempBeforeBaking : writable('globalBakingConfigResponse.maxTempBeforeBaking'),
  maxTempAfterBaking  : writable('globalBakingConfigResponse.maxTempAfterBaking'),
  maxTempDuration     : writable('globalBakingConfigResponse.maxTempDuration'),
  maxTempDurationMins : divide('maxTempDuration', 60),



  // ----- Methods -----
  request () {
    return RSVP.hash({
      misc : this.requestMiscConfig(),
    })
  },

  requestGlobalBakingConfig () {
    const ajax = this.get('ajax')

    return this.dispatchPromise('globalBakingConfig', () => {
      return ajax.getGlobalBakingConfig()
    })
  },

  requestMiscConfig () {
    const ajax = this.get('ajax')

    return this.dispatchPromise('miscConfig', () => {
      return ajax.getMiscConfig()
    })
      .then(config => this.applyMiscConfig(config))
  },

  applyMiscConfig (config) {
    this.useLocale()
    this.useTimezone()
    return config
  },

  useLocale (locale) {
    locale = locale || this.get('locale')

    console.log('locale')

    const intl   = this.get('intl')
    const moment = this.get('moment')

    intl.setLocale(locale)
    moment.setLocale(locale)
  },

  useTimezone (timezone) {
    timezone = timezone || this.get('locale')

    const moment = this.get('moment')
    moment.setTimeZone(timezone)
  },



  actions : {
    setPassword (password, newPassword) {
      const ajax = this.get('ajax')

      return this.dispatchPromise('password', () => {
        return ajax.setPassword({password, newPassword})
      })
    },

    setGlobalBakingConfig (attr, value) {
      const ajax      = this.get('ajax')
      const prefsNode = this.get('zen.state.settings')

      const effectiveValue = attr === 'maxTempDurationMins' ? value * 60 : value
      const effectiveAttr  = attr === 'maxTempDurationMins' ? 'maxTempDuration' : attr

      return this.dispatchPromise('globalBakingConfig', () => {
        return ajax
          .setGlobalBakingConfig({[effectiveAttr] : effectiveValue})
          .then(response => (prefsNode.reset(attr), response))
      })
    },

    setMiscConfig (attr, value) {
      const ajax = this.get('ajax')

      return this.dispatchPromise('miscConfig', () => {
        return ajax.setMiscConfig(attr, value)
      })
        .then(config => this.applyMiscConfig(config))
    },
  },
})
