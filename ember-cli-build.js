/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app')
const fs       = require('fs')
const dotenv   = require('dotenv')



// Dot-env file
const environment   = process.env.EMBER_ENV || 'development'

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

    sassOptions : {
      includePaths : ['app'],
    },
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

  return app.toTree()
}
