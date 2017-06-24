// ----- Ember modules -----
import Service from 'ember-service'
import {reads} from 'ember-computed'

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

  init () {
    this._super()

    console.log('ENV', ENV)
  }



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----

})
