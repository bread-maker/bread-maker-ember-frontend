/* global server */
import { Response } from 'ember-cli-mirage'
import _ from 'lodash'

const LIMIT = 500



function respondUnauthorized (error_code = 11, error_text) {
  return new Response(401, {}, {error : {error_code, error_text}})
}



function parseParams (str) {
  if (!str) {
    return {}
  } else if (str[0] === '{' || str[0] === '[') {
    return JSON.parse(str)
  } else {
    return str
      .split('&')
      .map(substr => substr.split('=').map(decodeURIComponent))
      .reduce((result, [key, value]) => {
        const path = key.replace(/\[/g, '.').replace(/\]/g, '')
        _.set(result, path, value)
        return result
      }, {})
  }
}



function respond (schema, request) {
  const error = _.last(schema.db.errors)
  if (error) return new Response(error.status_code, {}, {error})

  const params = {
    ...request.queryParams,
    ...parseParams(request.requestBody),
  }

  const {method, token} = params

  let callback

  if (anonMethods[method]) {
    callback = anonMethods[method]
  } else {
    if (!authMethods[method]) throw new Error(`Mirage API endpoint "${method}" is not defined`)

    const storeToken = _.last(schema.db.tokens)

    if (!token || !storeToken || token !== storeToken.value) return respondUnauthorized(11)
    if (storeToken.expired) return respondUnauthorized(13, 'Token expired')

    callback = authMethods[method]
  }

  return callback(schema, request, params)
}



const anonMethods = {

  "auth.login" ({db}, request, {password}) {
    const passwordRecord = _.last(db.passwords)

    if (!passwordRecord || passwordRecord.value !== password) {
      return respondUnauthorized()
    }

    const token = server.create('token')

    return {token : token.value}
  },

  stats ({db}/*, request, params*/) {
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

  "config.misc.get" ({db}/*, request*/) {
    const config = _.last(db.miscConfigs) || server.create('misc-config')

    return {config}
  },
}


const authMethods = {
  "auth.passwd" ({db}, request, params) {
    const [password] = db.passwords.where({value : params.password})
    if (!password) return respondUnauthorized()
    db.passwords.update(password.id, {value : params.new_password})
    return {result : true}
  },

  "config.baking.global.get" ({db}/*, request*/) {
    const config = _.last(db.globalConfigs) || server.create('global-config')

    return {config}
  },

  "config.baking.global.set" ({db}, request, params) {
    let config = _.last(db.globalConfigs) || server.create('global-config')
    const newValues = _.mapValues(params.config, value => parseInt(value, 10))
    config = db.globalConfigs.update(config.id, newValues)
    return {config}
  },

  "config.misc.set" ({db}, request, params) {
    let config = _.last(db.miscConfigs) || server.create('misc-config')
    const {key, value} = params
    config = db.miscConfigs.update(config.id, {[key] : value})
    return {config}
  },

  "config.baking.stages.get.all" ({db}/*, request*/) {
    const programs = db.programs.toArray()

    return {programs}
  },

  "config.baking.stages.set" ({db}, request, params) {
    const {crust_id, program_id, program} = params
    const [{id}] = db.programs.where({crust_id, program_id})

    db.programs.update(id, program)

    return {crust_id, program_id, program}
  },

  "baking.bake" () {
    return {result : true}
  },

  "noerr" () {
    return {result : true}
  },

  "wifi.scan" () {
    return {result : true}
  },

  "wifi.status" () {
    return {result : true}
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
    return respond(schema, request)
  })

  this.post('api/', function (schema, request) {
    return respond(schema, request)
  })

  this.put('api/', function (schema, request) {
    return respond(schema, request)
  })
}
