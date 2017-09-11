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
    positionStage ({sourceList, sourceIndex, targetList, targetIndex}) {
      if (sourceList === targetList && sourceIndex === targetIndex) return

      const item = sourceList.objectAt(sourceIndex)

      sourceList.removeAt(sourceIndex)
      targetList.insertAt(targetIndex, item)
    },

    save () {
      const currentProgram = this.get('currentProgram')
      currentProgram.save()
    },
  },
})
