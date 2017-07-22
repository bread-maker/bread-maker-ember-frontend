// ----- Ember modules -----
import {reads} from 'ember-computed'
import service from 'ember-service/inject'

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
    params = {...params, method}
    if (token) params.token = token
    const finalUrl = this.buildUrlQueryParams(params)

    return this
      .request(finalUrl)
      .catch(error => this._logOutOnTokenExpired(error))
  },

  postMethod (method, data = {}) {
    const finalUrl = this.buildUrlQueryParams({method})
    const token = this.get('zen.state.session.token')
    data = {...data}
    if (token) data.token = token

    return this
      .post(finalUrl, {data})
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

  getGlobalBakingConfig (params = {}) {
    return this
      .getMethod('config.baking.global.get', params)
      .then(({config}) => config)
  },

  setGlobalBakingConfig (config, params = {}) {
    return this
      .postMethod('config.baking.global.set', {config, ...params})
      .then(({config}) => config)
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



  // ----- Events and observers -----



  // ----- Tasks -----

})
