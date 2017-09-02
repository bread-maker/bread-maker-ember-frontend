// ----- Ember modules -----
import RESTAdapter from 'ember-data/adapters/rest'
import service from 'ember-service/inject'

// ----- Ember addons -----
import writable from 'ember-macro-helpers/writable'

// ----- Third-party libraries -----
import $ from 'jquery'

// ----- Own modules -----



export default RESTAdapter.extend({

  // ----- Services -----
  config  : service(),
  session : service(),



  // ----- Overridden properties -----
  host : writable('config.backendUrl'),



  // ----- Static properties -----



  // ----- Computed properties -----



  // ----- Overridden Methods -----
  buildURL (modelName, id, snapshot, requestType, query) {
    const host   = this.get('host')
    const method = this.apiMethodForRequest({modelName, id, snapshot, requestType, query})
    const params = $.param({method})

    return `${host}?${params}`
  },



  findRecord (store, type, id, snapshot) {
    const requestType = 'findRecord'
    const url         = this.buildURL(type.modelName, id, snapshot, requestType)
    const query       = this.paramsForRequest({store, type, id, snapshot, requestType})

    return this.ajax(url, 'GET', { data : query })
  },



  findAll (store, type, sinceToken, snapshot) {
    const requestType = 'findAll'
    const url         = this.buildURL(type.modelName, null, snapshot, requestType)
    const query       = this.paramsForRequest({store, type, snapshot, requestType})

    return this.ajax(url, 'GET', { data : query })
  },



  // ----- Custom Methods -----
  apiMethodForRequest ({modelName/*, id, snapshot, requestType, query*/}) {
    return modelName
  },



  paramsForRequest (opts) {
    const {requestType} = opts
    const methodName    = `paramsFor__${requestType}`
    const params        = this[methodName] ? this[methodName](opts) : {}
    const token         = this.get('session.data.authenticated.token')

    return {...params, token}
  },


  // ----- Events and observers -----



  // ----- Tasks -----
})
