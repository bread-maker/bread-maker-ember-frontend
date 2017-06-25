// ----- Ember modules -----
import {reads} from 'ember-computed'
import service from 'ember-service/inject'

// ----- Ember addonAddon modules -----
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



  method (method, queryParams, options) {
    const finalUrl = this.buildUrl({method, ...queryParams})
    return this.request(finalUrl, options)
  },



  getStats () {
    return this.method('stats')
  }



  // ----- Events and observers -----



  // ----- Tasks -----

})
