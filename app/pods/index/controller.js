// ----- Ember modules -----
import Controller from 'ember-controller'
import controller from 'ember-controller/inject'
import service from 'ember-service/inject'
import {alias} from 'ember-computed'

// ----- Ember addons -----
// import writable from 'ember-macro-helpers/writable'

// ----- Third-party libraries -----

// ----- Own modules -----



export default Controller.extend({

  // ----- Services -----
  zen : service(),

  applicationController : controller('application'),



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----
  interval : alias('applicationController.interval'),



  // ----- Overridden Methods -----



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  actions : {
    updateInterval ({interval}) {
      this.setProperties({interval})

      const polling = this.get('zen.state.application.polling')

      if (!polling) this.get('applicationController').requestStats()
    },
  },
})
