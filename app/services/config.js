// ----- Ember modules -----
import Service from '@ember/service'

// ----- Ember addons -----
import reads from 'ember-macro-helpers/reads'

// ----- Own modules -----
import ENV from 'bread-maker-ember-frontend/config/environment'



export default Service.extend({

  // ----- Services -----



  // ----- Overridden properties -----



  // ----- Static properties -----
  envVars : ENV.envVars,



  // ----- Computed properties -----
  backendUrl : reads('envVars.BM_BACKEND_URL'),



  // ----- Overridden Methods -----



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----

})
