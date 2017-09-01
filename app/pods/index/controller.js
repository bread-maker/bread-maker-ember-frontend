// ----- Ember modules -----
import Controller from 'ember-controller'
import controller from 'ember-controller/inject'
import service from 'ember-service/inject'

// ----- Ember addons -----
// import writable from 'ember-macro-helpers/writable'

// ----- Third-party libraries -----

// ----- Own modules -----



export default Controller.extend({

  // ----- Services -----
  applicationController : controller('application'),

  status : service(),



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----



  // ----- Overridden Methods -----



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  actions : {
    updateInterval ({interval}) {
      const applicationController = this.get('applicationController')
      applicationController.setProperties({interval})
    },
  },
})
