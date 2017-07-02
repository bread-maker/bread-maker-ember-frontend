// ----- Ember modules -----
import {reads} from 'ember-computed'
import service from 'ember-service/inject'

// ----- Ember Addon modules -----
import AjaxService from 'ember-ajax/services/ajax'

// ----- Third-party modules -----



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
    const finalUrl = this.buildUrlQueryParams({...params, method, token})

    return this.request(finalUrl)
  },

  postMethod (method, data = {}) {
    const finalUrl = this.buildUrlQueryParams({method})
    const token = this.get('zen.state.session.token')

    return this.post(finalUrl, {
      data : {
        ...data,
        token
      }
    })
  },


  login (password) {
    return this.getMethod('auth.login', {password})
  },

  getStats () {
    return this.getMethod('stats')
  },

  getTimezone () {
    return this.getMethod('config.timezone.get')
  },

  setProgram (program_id, crust_id, program) {
    console.log({program_id, crust_id, program})
    return this
      .postMethod('config.baking.stages.set', {
        program_id,
        crust_id,
        program
      })
  },



  // ----- Events and observers -----



  // ----- Tasks -----

})
