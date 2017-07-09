// ----- Ember modules -----
import {reads} from 'ember-computed'
import service from 'ember-service/inject'

// ----- Ember Addon modules -----
import AjaxService from 'ember-ajax/services/ajax'

// ----- Third-party modules -----
import RSVP from 'rsvp'



export default AjaxService.extend({

  // ----- Services -----
  config : service(),
  zen    : service(),



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
      .then(data => {
        return data.error
          ? RSVP.reject(data.error)
          : data
      })
  },

  postMethod (method, data = {}) {
    const finalUrl = this.buildUrlQueryParams({method})
    const token = this.get('zen.state.session.token')
    data = {...data}
    if (token) data.token = token

    return this
      .post(finalUrl, {
        data,
      })
      .then(data => {
        return data.error
          ? RSVP.reject(data.error)
          : data
      })
  },


  login (password) {
    return this.getMethod('auth.login', {password})
  },

  getStats (interval = '') {
    return this.getMethod('stats', {interval})
  },

  getTimezone () {
    return this
      .getMethod('config.timezone.get')
      .then(({timezone}) => timezone)
  },

  setProgram (program_id, crust_id, program) {
    return this
      .postMethod('config.baking.stages.set', {
        program_id,
        crust_id,
        program,
      })
  },

  setPassword (password, new_password) {
    debugger
    return this.postMethod('auth.passwd', {password, new_password})
  },



  // ----- Events and observers -----



  // ----- Tasks -----

})
