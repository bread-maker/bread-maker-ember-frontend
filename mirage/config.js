/* global server */
import { Response } from 'ember-cli-mirage'

const LIMIT = 500

const getMethods = {

  "auth.login" ({db}, {queryParams: {password}}) {
    const passwordRecord = _.last(db.passwords)

    if (!passwordRecord || passwordRecord.value !== password) {
      return new Response(401, {}, {error : {error_code : 11}})
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



  "config.baking.global.get" ({db}/*, request*/) {
    const config = db.globalConfigs[0] || server.create('global-config')

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
    const method = request.queryParams.method

    if (!getMethods[method]) throw new Error(`Mirage API endpoint "${method}" is not defined`)

    return getMethods[method](schema, request)
  })
}
