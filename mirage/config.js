/* global server */
import { Response } from 'ember-cli-mirage'

const LIMIT = 500



function respondUnauthorized () {
  return new Response(401, {}, {error : {error_code : 11}})
}



function parseParams (str) {
  if (!str) return

  return str
    .split('&')
    .map(substr => substr.split('=').map(decodeURIComponent))
    .reduce((result, [key, value]) => {
      const path = key.replace(/\[/g, '.').replace(/\]/g, '')
      _.set(result, path, value)
      return result
    }, {})
}



const anonMethods = {

  "auth.login" ({db}, {queryParams: {password}}) {
    const passwordRecord = _.last(db.passwords)

    if (!passwordRecord || passwordRecord.value !== password) {
      return respondUnauthorized()
    }

    const token = server.create('token')

    return {token : token.value}
  },

  stats ({db}/*, request*/) {
    const stats =
      db.stats.length
        ? _.takeRight(db.stats, LIMIT)
        : [server.create('stat')]

    return {
      stats,
      last_program : null,
      last_status  : _.last(stats),
    }
  },
}


const authMethods = {
  "config.baking.global.get" ({db}/*, request*/) {
    const config = db.globalConfigs[0] || server.create('global-config')

    return {config}
  },



  "config.baking.global.set" ({db}, params/*, request*/) {
    let config = _.last(db.globalConfigs) || server.create('global-config')
    const newValues = _.mapValues(params.config, value => parseInt(value, 10))
    config = db.globalConfigs.update(config.id, newValues)
    return {config}
  },
}



export default function () {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  this.urlPrefix = 'http://mirage'

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  this.get('api/', function (schema, request) {
    const {method, token} = request.queryParams

    if (anonMethods[method]) return anonMethods[method](schema, request)

    if (!authMethods[method]) throw new Error(`Mirage API endpoint "${method}" is not defined`)

    const storeToken = _.last(schema.db.tokens)

    if (!token || !storeToken || token !== storeToken.value) return respondUnauthorized()

    return authMethods[method](schema, request)
  })

  this.post('api/', function (schema, request) {
    const {method} = request.queryParams
    const params = parseParams(request.requestBody)
    const {token} = params

    if (anonMethods[method]) return anonMethods[method](schema, params, request)

    if (!authMethods[method]) throw new Error(`Mirage API endpoint "${method}" is not defined`)

    const storeToken = _.last(schema.db.tokens)

    if (!token || !storeToken || token !== storeToken.value) return respondUnauthorized()

    return authMethods[method](schema, params, request)
  })
}
