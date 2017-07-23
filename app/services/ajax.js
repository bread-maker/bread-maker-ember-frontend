// ----- Ember modules -----
import {reads} from 'ember-computed'
import service from 'ember-service/inject'
import {camelize, decamelize} from 'ember-string'
import get from 'ember-metal/get'

// ----- Ember Addon modules -----
import AjaxService from 'ember-ajax/services/ajax'
import {isUnauthorizedError} from 'ember-ajax/errors'

// ----- Third-party modules -----
import RSVP from 'rsvp'



export default AjaxService.extend({

  // ----- Services -----
  config  : service(),
  session : service(),
  zen     : service(),



  // ----- Overridden properties -----
  host : reads('config.backendUrl'),


  // ----- Static properties -----



  // ----- Computed properties -----




  // ----- Overridden Methods -----



  // ----- Custom Methods -----
  buildUrlQueryParams (params) {
    if (!params || !Object.keys(params).length) return ''

    const serializedParams =
      _
        .map(params, (value, key) => {
          value = encodeURIComponent(value)
          key = encodeURIComponent(key)
          return `${key}=${value}`
        })
        .join('&')

    return `?${serializedParams}`
  },

  getMethod (method, params = {}) {
    const token = this.get('zen.state.session.token')

    params = {
      method,
      ...params,
      ...(token ? {token} : {}),
    }

    params = this._decamelizeKeys_(params)

    const finalUrl = this.buildUrlQueryParams(params)

    return this
      .request(finalUrl)
      .then(this._camelizeKeys_)
      .catch(error => this._logOutOnTokenExpired(error))
  },

  postMethod (method, data = {}) {
    const finalUrl = this.buildUrlQueryParams({method})
    const token = this.get('zen.state.session.token')

    data = {
      ...data,
      ...(token ? {token} : {}),
    }

    data = this._decamelizeKeys_(data)

    return this
      .post(finalUrl, {data})
      .then(this._camelizeKeys_)
      .catch(error => this._logOutOnTokenExpired(error))
  },


  login (password, params = {}) {
    return this.getMethod('auth.login', {password, ...params})
  },

  getStats (interval = '', params = {}) {
    return this.getMethod('stats', {interval, ...params})
  },

  getTimezone (params = {}) {
    return this
      .getMethod('config.timezone.get', params)
      .then(({timezone}) => timezone)
  },

  setProgram (program_id, crust_id, program, params = {}) {
    return this
      .postMethod('config.baking.stages.set', {
        program_id,
        crust_id,
        program,
        ...params,
      })
  },

  setPassword (password, new_password, params = {}) {
    return this.postMethod('auth.passwd', {password, new_password, params})
  },

  _globalBakingConfigMapping : {
    maxTempBeforeTimer  : 'maxTempA',
    maxTempBeforeBaking : 'maxTempB',
    maxTempAfterBaking  : 'warmTemp',
    maxTempDuration     : 'maxWarmTime',
  },

  getGlobalBakingConfig (params = {}) {
    return this
      .getMethod('config.baking.global.get', params)
      .then(({config}) => config)
      .then(this._camelizeKeys_)
      .then(config => this._mapKeysReverse(config, this._globalBakingConfigMapping))
  },

  setGlobalBakingConfig (config, params = {}) {
    config = this._mapKeys(config, this._globalBakingConfigMapping)

    return this
      .postMethod('config.baking.global.set', {config, ...params})
      .then(({config}) => config)
  },

  confirmAuth (params = {}) {
    return this.getGlobalBakingConfig(params)
  },



  // ----- Private methods -----
  _logOutOnTokenExpired (error) {
    if (isUnauthorizedError(error) && this.get('session.isAuthenticated')) {
      this.get('session').invalidate()
    }

    return RSVP.reject(error)
  },

  _setAutorun (enabled, params = {}) {
    enabled = enabled ? 1 : 0
    return this.postMethod('emu.autorun', {enabled, ...params})
  },

  _setEmuTemp (temp, params = {}) {
    return this.postMethod('emu.temp', {temp, ...params})
  },

  _camelizeKeys_ (obj) {
    return _.mapKeys(obj, (value, key) => camelize(key))
  },

  _decamelizeKeys_ (obj) {
    return _.mapKeys(obj, (value, key) => decamelize(key))
  },

  _mapKeys (obj, mapping) {
    return _.mapKeys(obj, (value, key) => mapping[key])
  },

  _mapKeysReverse (obj, mapping) {
    return _.mapKeys(obj, (value, key) => _.findKey(mapping, value => value === key))
  },



  // ----- Events and observers -----



  // ----- Tasks -----

})
