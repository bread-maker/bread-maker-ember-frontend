// ----- Ember modules -----
import {reads} from 'ember-computed'
import service from 'ember-service/inject'

// ----- Ember addonAddon modules -----
import AjaxService from 'ember-ajax/services/ajax'

// ----- Own modules -----



export default AjaxService.extend({

  // ----- Services -----
  config : service(),



  // ----- Overridden properties -----
  host : reads('config.backendUrl')


  // ----- Static properties -----



  // ----- Computed properties -----




  // ----- Overridden Methods -----




  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----

})
