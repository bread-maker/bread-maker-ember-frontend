// ----- Ember modules -----
import service from 'ember-service/inject'

// ----- Ember addons -----
import {Node, promiseAttr} from 'ember-zen'
// import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'
import divide from 'ember-awesome-macros/divide'

// ----- Third-party libraries -----
import RSVP from 'rsvp'

// ----- Own modules -----
import timeout from 'bread-maker-ember-frontend/utils/timeout'

// ----- Constants -----
const LS_PREFIX = 'bread-maker:'



export default Node.extend({

  // ----- Attributes -----
  attrs : {
    locale             : promiseAttr,
    temp               : promiseAttr,
    timezone           : promiseAttr,
    password           : promiseAttr,
    globalBakingConfig : promiseAttr,
  },



  // ----- Services -----
  ajax   : service(),
  intl   : service(),
  moment : service(),



  // ----- Computed properties -----
  locale   : writable('localeResponse'),
  temp     : writable('tempResponse'),
  timezone : writable('timezoneResponse'),

  maxTempBeforeTimer  : writable('globalBakingConfigResponse.maxTempBeforeTimer'),
  maxTempBeforeBaking : writable('globalBakingConfigResponse.maxTempBeforeBaking'),
  maxTempAfterBaking  : writable('globalBakingConfigResponse.maxTempAfterBaking'),
  maxTempDuration     : writable('globalBakingConfigResponse.maxTempDuration'),
  maxTempDurationMins : divide('maxTempDuration', 60),



  // ----- Methods -----
  requestLocale () {
    const key    = `${LS_PREFIX}locale`
    const locale = localStorage.getItem(key) || 'en-gb'

    return this.dispatchPromise('locale', () => {
      return timeout(1000)
        .then(() => locale)
        .then(locale => this.updateLocale(locale))
    })
  },

  requestTemp () {
    const key  = `${LS_PREFIX}temp`
    const temp = localStorage.getItem(key) || 'celsius'

    return this.dispatchPromise('temp', () => {
      return timeout(1000)
        .then(() => temp)
    })
  },

  requestTimezone () {
    const key = `${LS_PREFIX}timezone`
    const timezone = localStorage.getItem(key) || 'UTC'

    return this.dispatchPromise('timezone', () => {
      return timeout(1000)
        .then(() => timezone)
        .then(timezone => this.updateTimezone(timezone))
    })
  },

  request () {
    return RSVP.hash({
      locale   : this.requestLocale(),
      temp     : this.requestTemp(),
      timezone : this.requestTimezone(),
    })
  },

  requestGlobalBakingConfig () {
    const ajax = this.get('ajax')

    return this.dispatchPromise('globalBakingConfig', () => {
      return ajax.getGlobalBakingConfig()
    })
  },

  updateLocale (locale) {
    const intl   = this.get('intl')
    const moment = this.get('moment')

    intl.setLocale(locale)
    moment.setLocale(locale)
    return locale
  },

  updateTimezone (timezone) {
    const moment = this.get('moment')

    moment.setTimeZone(timezone)
    return timezone
  },



  actions : {
    setLocale (locale) {
      const key = `${LS_PREFIX}locale`
      localStorage.setItem(key, locale)

      return this.dispatchPromise('locale', () => {
        return timeout(1000)
          .then(() => locale)
          .then(() => this.updateLocale(locale))
      })
    },

    setTemp (temp) {
      const key = `${LS_PREFIX}temp`
      localStorage.setItem(key, temp)

      return this.dispatchPromise('temp', () => {
        return timeout(1000)
          .then(() => temp)
      })
    },

    setTimezone (timezone) {
      const key = `${LS_PREFIX}timezone`
      localStorage.setItem(key, timezone)

      return this.dispatchPromise('timezone', () => {
        return timeout(1000)
          .then(() => timezone)
          .then(() => this.updateTimezone(timezone))
      })
    },

    setPassword (password, newPassword) {
      const ajax = this.get('ajax')

      return this.dispatchPromise('password', () => {
        return ajax.setPassword({password, newPassword})
      })
    },

    setGlobalBakingConfig (attr, value) {
      const ajax      = this.get('ajax')
      const prefsNode = this.get('zen.state.settings')

      if (attr === 'maxTempDurationMins') value *= 60

      return this.dispatchPromise('globalBakingConfig', () => {
        return ajax
          .setGlobalBakingConfig({[key] : efficientValue})
          .then(response => (prefsNode.reset(attr), response))
      })
    },
  },
})
