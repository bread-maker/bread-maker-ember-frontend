/* eslint-env node */
const _ = require('lodash')

const envVars = _.pick(process.env, [
  'BM_BACKEND_URL',
])

module.exports = function (environment) {
  const ENV = {
    modulePrefix    : 'bread-maker-ember-frontend',
    podModulePrefix : 'bread-maker-ember-frontend/pods',
    environment     : environment,
    rootURL         : '/',
    locationType    : 'auto',
    envVars,
    EmberENV        : {
      FEATURES : {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES : {
        // Prevent Ember Data from overriding Date.parse.
        Date : false,
      },
    },

    APP : {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    moment : {
      // Options:
      // 'all' - all years, all timezones
      // 'subset' - 2010-2020, all timezones
      // 'none' - no data, just timezone API
      includeTimezone : 'subset',
    },
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none'

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_VIEW_LOOKUPS = false

    ENV.APP.rootElement = '#ember-testing'
  }

  // if (environment === 'production') {
  //
  // }

  return ENV
}
