// ----- Ember modules -----
import { inject as service } from '@ember/service'

// ----- Ember Data modules -----
import RESTAdapter from 'ember-data/adapters/rest'

// ----- Ember addons -----
import writable from 'ember-macro-helpers/writable'

// ----- Third-party libraries -----
import _ from 'lodash'
import $ from 'jquery'
import RSVP from 'rsvp'

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
  ajax () {
    return this
      ._super(...arguments)
      .catch(error => RSVP.reject(this._formatError(error)))
      .catch(error => this._logOutOnTokenExpired(error))
  },



  buildURL (modelName, id, snapshot, requestType, query) {
    const host   = this.get('host')
    const method = this.apiMethodForRequest({modelName, id, snapshot, requestType, query})
    const params = {method}
    const token  = this.get('session.data.authenticated.token')

    if (token) params.token = token

    const serializedParams = $.param(params)

    return `${host}?${serializedParams}`
  },



  findRecord (store, type, id, snapshot) {
    const requestType  = 'findRecord'
    const url          = this.buildURL(type.modelName, id, snapshot, requestType)
    const paramsMethod = this.paramsMethodForRequest(requestType)
    const data         = paramsMethod && paramsMethod({store, type, id, snapshot, requestType})

    return this.ajax(url, 'GET', { data })
  },



  findAll (store, type, sinceToken, snapshot) {
    const requestType  = 'findAll'
    const url          = this.buildURL(type.modelName, null, snapshot, requestType)
    const paramsMethod = this.paramsMethodForRequest(requestType)
    const data         = paramsMethod && this.paramsMethod({store, type, snapshot, requestType})

    return this.ajax(url, 'GET', { data })
  },



  normalizeErrorResponse (status, headers, payload) {
    if (payload && typeof payload === 'object' && payload.error) {
      return [
        {
          status : `${status}`,
          title  : payload.error.error_text,
          detail : payload.error.error_code,
        },
      ]
    } else {
      return this._super(status, headers, payload)
    }
  },



  updateRecord (store, type, snapshot) {
    const requestType  = 'updateRecord'
    const url          = this.buildURL(type.modelName, null, snapshot, requestType)
    const paramsMethod = this.paramsMethodForRequest(requestType)


    const data =
      paramsMethod
        ? paramsMethod({store, type, snapshot, requestType})
        : snapshot.serialize({includeId : true})

    return this.ajax(url, 'PUT', { data })
  },



  // ----- Custom Methods -----
  apiMethodForRequest ({modelName/*, id, snapshot, requestType, query*/}) {
    return modelName
  },



  paramsMethodForRequest (requestType) {
    const methodName = `paramsFor__${requestType}`
    const method = this[methodName]
    return method && method.bind(this)
  },

  // serializeCustom () {
  //   const data = {}
  //   const serializer = store.serializerFor(type.modelName)
  //   serializer.serializeIntoHash(data, type, snapshot)
  //   return data
  // },



  // ----- Private methods -----
  _formatError (error) {
    error.status = _.get(error, 'errors[0].status')
    error.name   = _.get(error, 'errors[0].title')
    return error
  },



  _logOutOnTokenExpired (error) {
    if (
      error.status == 401 // eslint-disable-line eqeqeq
      && this.get('session.isAuthenticated')
    ) {
      this
        .get('session')
        .invalidate()
        .then(() => {
          if (!this.get('config.isTest')) location.reload()
        })
    }

    return RSVP.reject(error)
  },



  // ----- Events and observers -----



  // ----- Tasks -----
})
