// ----- Ember modules -----
import Service from '@ember/service'

// ----- Ember addons -----
// import raw from 'ember-macro-helpers/raw'
import reads from 'ember-macro-helpers/reads'
// import {eq} from 'ember-awesome-macros'

// ----- Own modules -----
import ENV from 'bread-maker-ember-frontend/config/environment'



export default Service.extend({

  // ----- Services -----



  // ----- Overridden properties -----



  // ----- Static properties -----
  envVars : ENV.envVars,



  // ----- Computed properties -----
  backendUrl : reads('envVars.BM_BACKEND_URL'),
  isDev      : ENV.environment === 'development',



  // ----- Overridden Methods -----



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----

})
