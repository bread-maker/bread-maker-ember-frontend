// ----- Ember modules -----
import {reads} from 'ember-computed'
import service from 'ember-service/inject'

// ----- Ember Addon modules -----
import AjaxService from 'ember-ajax/services/ajax'

// ----- Third-party modules -----



export default AjaxService.extend({

  // ----- Services -----
  config : service(),



  // ----- Overridden properties -----
  host : reads('config.backendUrl'),


  // ----- Static properties -----



  // ----- Computed properties -----




  // ----- Overridden Methods -----



  // ----- Custom Methods -----
  buildUrl (params) {
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
    const finalUrl = this.buildUrl({method, ...params})
    return this.request(finalUrl)
  },

  postMethod (method, data = {}) {
    const finalUrl = this.buildUrl({method})
    return this.post(finalUrl, {data})
  },


  login (password) {
    return this.getMethod('auth.login', {password})
  },

  getStats () {
    return this.getMethod('stats')
  },

  setProgram (programId, crustId, data) {
    return this
      .postMethod('config.baking.stages.set')
  },



  // ----- Events and observers -----



  // ----- Tasks -----

})
