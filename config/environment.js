/* eslint-env node */
const _        = require('lodash')
const fs       = require('fs')
const dotenv   = require('dotenv')



const ALLOWED_ENV_VARS = [
  'BM_DEPLOY_TARGET',
  'BM_BACKEND_URL',
]



module.exports = function (environment) {

  // Dot-env file
  if (environment) {
    /* eslint-disable indent */
    const defaultTarget =
      environment === 'production' ? 'prod' :
      environment === 'test'       ? 'mirage' :
                                     'localhost-4200'
    /* eslint-enable indent */

    const target     = process.env.BM_DEPLOY_TARGET || defaultTarget
    const dotEnvFile = `./.env-${target}`

    if (fs.existsSync(dotEnvFile)) {
      dotenv.config({path : dotEnvFile})
    } else if (process.env.BM_DEPLOY_TARGET) {
      throw new Error(`dot-env file specified but not found: ${dotEnvFile}`)
    } else {
      console.warn(`default dot-env file not found: ${dotEnvFile}, assuming env vars are passed manually`)
    }
  }

  const envVars = _.pick(process.env, ALLOWED_ENV_VARS)

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
      includeTimezone : 'subset',
      includeLocales  : ['en-gb', 'en', 'ru'],
    },
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  // here you can enable a production-specific feature
  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none'

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_VIEW_LOOKUPS = false

    ENV.APP.rootElement = '#ember-testing'

    ENV.APP.LOG_TRANSITIONS = true
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true

    // https://github.com/emberjs/ember-qunit/issues/309#issuecomment-366843261
    ENV.APP.autoboot = false
  }

  // if (environment === 'production') {
  //
  // }

  ENV['ember-cli-mirage'] = {
    enabled : environment === 'test' || envVars.BM_DEPLOY_TARGET === 'mirage',
    // enabled : true,
  }

  return ENV
}
