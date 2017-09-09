// ----- Ember modules -----
import Controller from '@ember/controller'
// import { inject as service } from '@ember/service'

// ----- Ember addons -----
import writable from 'ember-macro-helpers/writable'

// ----- Third-party libraries -----

// ----- Own modules -----



export default Controller.extend({

  // ----- Services -----
  // ajax : service(),



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----
  currentProgram : writable('model.currentProgram'),



  // ----- Overridden Methods -----



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  actions : {
    save () {
      const currentProgram = this.get('currentProgram')
      currentProgram.save()
    },
  },
})
