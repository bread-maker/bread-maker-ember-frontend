/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app')
const Funnel   = require('broccoli-funnel')
const fs       = require('fs')



const environment   = process.env.EMBER_ENV || 'development'
const defaultTarget = environment === 'production' ? 'prod' : 'localhost-4200'
const target        = process.env.HB_DEPLOY_TARGET || defaultTarget
const dotEnvFile    = `./.env-${target}`
if (!fs.existsSync(dotEnvFile)) throw new Error(`ember-cli-build.js: dot-env file not found: ${dotEnvFile}`)



module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    babel : {
      includePolyfill : true,
      plugins         : [
        'transform-object-rest-spread',
      ],
    },

    dotEnv : {
      clientAllowedKeys : [
        'BM_BACKEND_URL',
      ],
      path : dotEnvFile
    },

    nodeModulesToVendor : [
      new Funnel('node_modules/lodash', {
        destDir : 'lodash',
        files   : ['lodash.js']
      })
    ]
    // Add options here
  })

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('vendor/lodash/lodash.js')

  return app.toTree()
}
