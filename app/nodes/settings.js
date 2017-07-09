// ----- Ember modules -----
import service from 'ember-service/inject'

// ----- Ember addons -----
import Node from 'ember-zen/node'
// import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'
// import not from 'ember-awesome-macros/not'

// ----- Third-party libraries -----
import RSVP from 'rsvp'

// ----- Own modules -----
import timeout from 'bread-maker-ember-frontend/utils/timeout'

// ----- Constants -----
const LS_PREFIX = 'bread-maker:'



export default Node.extend({

  // ----- Attributes -----
  attrNames : [
    'localeIsPending',
    'localeIsFulfilled',
    'localeIsRejected',
    'localeIsSettled',
    'localeResponse',
    'localeError',

    'tempIsPending',
    'tempIsFulfilled',
    'tempIsRejected',
    'tempIsSettled',
    'tempResponse',
    'tempError',

    'timezoneIsPending',
    'timezoneIsFulfilled',
    'timezoneIsRejected',
    'timezoneIsSettled',
    'timezoneResponse',
    'timezoneError',

    'passwordIsPending',
    'passwordIsFulfilled',
    'passwordIsRejected',
    'passwordIsSettled',
    'passwordResponse',
    'passwordError',
  ],

  localeIsPending   : false,
  localeIsFulfilled : false,
  localeIsRejected  : false,
  localeIsSettled   : false,
  localeResponse    : 'en-US',
  localeError       : undefined,

  tempIsPending   : false,
  tempIsFulfilled : false,
  tempIsRejected  : false,
  tempIsSettled   : false,
  tempResponse    : 'celsius',
  tempError       : undefined,

  timezoneIsPending   : false,
  timezoneIsFulfilled : false,
  timezoneIsRejected  : false,
  timezoneIsSettled   : false,
  timezoneResponse    : 'UTC',
  timezoneError       : undefined,

  passwordIsPending   : false,
  passwordIsFulfilled : false,
  passwordIsRejected  : false,
  passwordIsSettled   : false,
  passwordResponse    : undefined,
  passwordError       : undefined,



  // ----- Services -----
  ajax   : service(),
  intl   : service(),
  moment : service(),



  // ----- Computed properties -----
  locale   : writable('localeResponse'),
  temp     : writable('tempResponse'),
  timezone : writable('timezoneResponse'),



  // ----- Methods -----
  requestLocale () {
    const key    = `${LS_PREFIX}locale`
    const locale = localStorage.getItem(key) || 'en'

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
        return ajax.setPassword(password, newPassword)
      })
    },
  },
})
