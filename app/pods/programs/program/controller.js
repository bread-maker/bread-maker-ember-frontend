// ----- Ember modules -----
import Controller from '@ember/controller'
import EmberObject from '@ember/object'
import { inject as service } from '@ember/service'
import { assert } from '@ember/debug'

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
  dialogs : service(),
  intl    : service(),



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
      if (sourceIndex === targetIndex) return
      assert("Should position within the same list", sourceList === targetList)

      const stages = this.get('currentProgram.stages')
      const item   = stages.objectAt(sourceIndex)

      stages.removeAt(sourceIndex)
      stages.insertAt(targetIndex, item)
    },

    removeStage (stage) {
      const stages = this.get('currentProgram.stages')
      stages.removeObject(stage)
    },

    reset () {
      const currentProgram = this.get('currentProgram')
      const dialogs        = this.get('dialogs')
      const intl           = this.get('intl')

      dialogs.confirm({
        message  : intl.t('routes.programs-program.reset-confirm'),
        actionOk : () => currentProgram.rollbackAttributes(),
      })
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
