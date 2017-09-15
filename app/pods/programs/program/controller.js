// ----- Ember modules -----
import Controller from '@ember/controller'
import EmberObject from '@ember/object'
// import { inject as service } from '@ember/service'

// ----- Ember addons -----
// import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'
import {map} from 'ember-awesome-macros/array'

// ----- Third-party libraries -----

// ----- Own modules -----



const StageWrapper = EmberObject.extend({
  stage            : null,
  beepsAreExpanded : false,
})



export default Controller.extend({

  // ----- Services -----
  // intl : service(),



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----
  currentProgram : writable('model.currentProgram'),
  stageWrappers  : map('currentProgram.stages', stage => StageWrapper.create({stage})),



  // ----- Overridden Methods -----



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  actions : {
    addStage () {
      const store  = this.get('store')
      const stages = this.get('currentProgram.stages')
      const stage  = store.createFragment('stage')

      stages.addObject(stage)
    },

    positionStage ({sourceList, sourceIndex, targetList, targetIndex}) {
      if (sourceList === targetList && sourceIndex === targetIndex) return

      const item = sourceList.objectAt(sourceIndex)

      sourceList.removeAt(sourceIndex)
      targetList.insertAt(targetIndex, item)
    },

    removeStage (stage) {
      const stages = this.get('currentProgram.stages')
      stages.removeObject(stage)
    },

    save () {
      const currentProgram = this.get('currentProgram')
      currentProgram.save()
    },

    addBeep (stage) {
      const store = this.get('store')
      const beeps = stage.get('beeps')
      const beep  = store.createFragment('beep')

      beeps.pushObject(beep)
    },

    removeBeep (stage, beep) {
      const beeps = stage.get('beeps')
      beeps.removeObject(beep)
    },
  },
})
