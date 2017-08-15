// ----- Ember modules -----
import service from 'ember-service/inject'

// ----- Ember addons -----
import {Node, attr} from 'ember-zen'
// import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'

import {divide, or} from 'ember-awesome-macros'

// ----- Third-party libraries -----
// import RSVP from 'rsvp'

// ----- Own modules -----



export default Node.extend({

  // ----- Attributes -----
  attrs : {
    password           : attr('node', {nodeType : 'promise'}),
    globalBakingConfig : attr('node', {nodeType : 'promise'}),
    miscConfig         : attr('node', {nodeType : 'promise'}),
  },



  // ----- Services -----
  ajax   : service(),
  intl   : service(),
  moment : service(),



  // ----- Computed properties -----
  localeDefault   : 'en-gb',
  timezoneDefault : 'UTC',

  locale   : or('miscConfig.content.locale',   'localeDefault'),
  timezone : or('miscConfig.content.timezone', 'timezoneDefault'),

  maxTempBeforeTimer  : writable('globalBakingConfig.content.maxTempBeforeTimer'),
  maxTempBeforeBaking : writable('globalBakingConfig.content.maxTempBeforeBaking'),
  maxTempAfterBaking  : writable('globalBakingConfig.content.maxTempAfterBaking'),
  maxTempDuration     : writable('globalBakingConfig.content.maxTempDuration'),
  maxTempDurationMins : divide('maxTempDuration', 60),



  // ----- Methods -----
  requestGlobalBakingConfig () {
    const ajax = this.get('ajax')

    return this.get('globalBakingConfig').dispatchAction('run', () => {
      return ajax.getGlobalBakingConfig()
    })
  },

  requestMiscConfig () {
    const ajax = this.get('ajax')

    return this.get('miscConfig').dispatchAction('run', () => {
      return ajax.getMiscConfig()
    })
      .then(config => this.applyMiscConfig(config))
  },

  applyMiscConfig (config) {
    this.applyLocale()
    this.applyTimezone()
    return config
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



  actions : {
    setPassword (password, newPassword) {
      const ajax = this.get('ajax')

      return this.get('password').dispatchAction('run', () => {
        return ajax.setPassword(password, newPassword)
      })
    },

    setGlobalBakingConfig (attr, value) {
      const ajax      = this.get('ajax')
      const prefsNode = this.get('zen.state.settings')

      const effectiveValue = attr === 'maxTempDurationMins' ? value * 60 : value
      const effectiveAttr  = attr === 'maxTempDurationMins' ? 'maxTempDuration' : attr

      return this.get('globalBakingConfig').dispatchAction('run', () => {
        return ajax
          .setGlobalBakingConfig({[effectiveAttr] : effectiveValue})
          .then(response => (prefsNode.reset(attr), response))
      })
    },

    setMiscConfig (attr, value) {
      const ajax = this.get('ajax')

      return this.get('miscConfig').dispatchAction('run', () => {
        return ajax.setMiscConfig(attr, value)
      })
        .then(config => this.applyMiscConfig(config))
    },
  },
})
