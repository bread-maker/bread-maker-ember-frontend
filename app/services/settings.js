// ----- Ember modules -----
import Service, {inject as service} from '@ember/service'
import { next } from '@ember/runloop'

// ----- Ember addon modules -----
import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'

import {
  divide,
  or,
} from 'ember-awesome-macros'

// ----- Own modules -----
import promiseProxy from 'bread-maker-ember-frontend/macros/promise-proxy'
import cache from 'bread-maker-ember-frontend/macros/cache'



export default Service.extend({

  // ----- Services -----
  ajax   : service(),
  intl   : service(),
  moment : service(),



  // ----- Overridden properties -----



  // ----- Static properties -----
  localeDefault   : 'en-gb',
  timezoneDefault : 'UTC',



  // ----- Global baking config -----
  globalBakingConfigPromise : null,
  globalBakingConfigCache   : null,
  globalBakingConfigProxy   : promiseProxy('globalBakingConfigPromise'),
  globalBakingConfig        : cache('globalBakingConfigProxy.content', 'globalBakingConfigCache'),
  maxTempBeforeTimer        : writable('globalBakingConfig.maxTempBeforeTimer'),
  maxTempBeforeBaking       : writable('globalBakingConfig.maxTempBeforeBaking'),
  maxTempAfterBaking        : writable('globalBakingConfig.maxTempAfterBaking'),
  maxTempDuration           : writable('globalBakingConfig.maxTempDuration'),
  maxTempDurationMins       : divide(or('maxTempDuration', 0), 60),

  // ----- Misc config -----
  miscConfigPromise : null,
  miscConfigCache   : null,
  miscConfigProxy   : promiseProxy('miscConfigPromise'),
  miscConfig        : cache('miscConfigProxy.content', 'miscConfigCache'),
  locale            : or('miscConfig.locale',   'localeDefault'),
  timezone          : or('miscConfig.timezone', 'timezoneDefault'),

  // ----- Password -----
  passwordPromise : null,
  passwordProxy   : promiseProxy('passwordPromise'),

  // ----- WiFi -----
  wifiStatusPromise : computed('ajax', ajax => ajax.wifiGetStatus()),
  wifiStatusProxy   : promiseProxy('wifiStatusPromise'),

  wifiScanPromise : computed('ajax', ajax => ajax.wifiGetScan()),
  wifiScanProxy   : promiseProxy('wifiScanPromise'),

  wifiConnectPromise : null,
  wifiConnectProxy   : promiseProxy('wifiConnectPromise'),



  // ----- Computed properties -----




  // ----- Overridden Methods -----



  // ----- Custom Methods -----
  requestGlobalBakingConfig () {
    if (this.get('globalBakingConfigProxy.isPending')) {
      throw new Error("Attempted to request global baking config while it's already in progress")
    }

    const ajax = this.get('ajax')

    const globalBakingConfigPromise = ajax.getGlobalBakingConfig()
    this.setProperties({globalBakingConfigPromise})
    return globalBakingConfigPromise
  },



  requestMiscConfig () {
    if (this.get('miscConfigProxy.isPending')) {
      throw new Error("Attempted to request misc config while it's already in progress")
    }

    const ajax = this.get('ajax')

    const miscConfigPromise =
      ajax
        .getMiscConfig()
        .then(config => this.applyMiscConfig(config))

    this.setProperties({miscConfigPromise})

    return miscConfigPromise
  },



  applyMiscConfig (config = {}) {
    this.applyLocale(config.locale)
    this.applyTimezone(config.timezone)
    return config
  },



  applyLocale (locale) {
    locale = locale || this.get('localeDefault')
    const intl   = this.get('intl')
    const moment = this.get('moment')

    if (locale === 'en-us') locale = 'en'

    intl.setLocale(locale)
    moment.setLocale(locale)
  },



  applyTimezone (timezone) {
    timezone = timezone || this.get('timezoneDefault')

    const moment = this.get('moment')
    moment.setTimeZone(timezone)
  },



  setPassword (password, newPassword) {
    if (this.get('passwordProxy.isPending')) {
      throw new Error("Attempted to update password while it's already in progress")
    }

    const ajax = this.get('ajax')

    const passwordPromise =
      ajax
        .setPassword(password, newPassword)
        .then(() => next(() => this.set('passwordPromise', null)))

    this.setProperties({passwordPromise})
    return passwordPromise
  },



  setGlobalBakingConfig (attr, value) {
    if (this.get('globalBakingConfigProxy.isPending')) {
      throw new Error("Attempted to update global baking config while it's already in progress")
    }

    const ajax           = this.get('ajax')
    const effectiveValue = attr === 'maxTempDurationMins' ? value * 60 : value
    const effectiveAttr  = attr === 'maxTempDurationMins' ? 'maxTempDuration' : attr

    const globalBakingConfigPromise = ajax.setGlobalBakingConfig({[effectiveAttr] : effectiveValue})
    this.setProperties({globalBakingConfigPromise})
    return globalBakingConfigPromise
  },



  setMiscConfig (attr, value) {
    if (this.get('miscConfigProxy.isPending')) {
      throw new Error("Attempted to update misc config while it's already in progress")
    }

    const ajax = this.get('ajax')

    const miscConfigPromise =
      ajax
        .setMiscConfig(attr, value)
        .then(config => this.applyMiscConfig(config))

    this.setProperties({miscConfigPromise})
    return miscConfigPromise
  },



  wifiGetStatus () {
    const ajax = this.get('ajax')
    const wifiStatusPromise = ajax.wifiGetStatus()

    return this.setProperties({wifiStatusPromise})
  },



  wifiGetScan () {
    const ajax = this.get('ajax')
    const wifiScanPromise = ajax.wifiGetScan()

    return this.setProperties({wifiScanPromise})
  },



  wifiConnect (ssid = '', encryption = 'NONE', key) {
    const ajax = this.get('ajax')
    const wifiConnectPromise = ajax.wifiConnect(ssid, encryption, key)

    this.setProperties({wifiConnectPromise})

    return wifiConnectPromise
  },



  // ----- Events and observers -----



  // ----- Tasks -----

})
