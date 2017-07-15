/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app')
const Funnel   = require('broccoli-funnel')
const fs       = require('fs')



// Dot-env file
const environment   = process.env.EMBER_ENV || 'development'
const defaultTarget = environment === 'production' ? 'prod' : 'localhost-4200'
const target        = process.env.HB_DEPLOY_TARGET || defaultTarget
const dotEnvFile    = `./.env-${target}`

if (!fs.existsSync(dotEnvFile)) {
  if (process.env.HB_DEPLOY_TARGET) {
    throw new Error(`dot-env file specified but not found: ${dotEnvFile}`)
  } else {
    console.warn(`default dot-env file not found: ${dotEnvFile}, assuming env vars are passed manually`)
  }
}



module.exports = function (defaults) {
  const options = {
    babel : {
      plugins : [
        'transform-object-rest-spread',
      ],
    },

    'ember-cli-babel' : {
      includePolyfill : true,
    },

    nodeModulesToVendor : [
      new Funnel('node_modules/lodash', {
        destDir : 'lodash',
        files   : ['lodash.js']
      })
    ]
    // Add options here
  }

  if (fs.existsSync(dotEnvFile)) {
    options.dotEnv = {
      clientAllowedKeys : [
        'BM_BACKEND_URL',
      ],
      path : dotEnvFile
    }
  }

  const app = new EmberApp(defaults, options)



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
