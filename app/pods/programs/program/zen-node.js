// ----- Ember modules -----
// import service from 'ember-service/inject'

// ----- Ember addons -----
import {Node, attr} from 'ember-zen'
// import computed from 'ember-macro-helpers/computed'
import raw from 'ember-macro-helpers/raw'

import {
  and,
  eq,
} from 'ember-awesome-macros'

import {
  findBy,
} from 'ember-awesome-macros/array'

// ----- Third-party libraries -----
// import RSVP from 'rsvp'

// ----- Own modules -----
import filterObject from 'bread-maker-ember-frontend/utils/filter-object'
// import timeout from 'bread-maker-ember-frontend/utils/timeout'

// ----- Constants -----
const RESETTABLE_ATTRS = [
  'nameUserInput',
  'maxTempBeforeTimerUserInput',
  'maxTempBeforeBakingUserInput',
  'maxTempAfterBakingUserInput',
  'maxTempDurationMinsUserInput',
]



export default Node.extend({

  // ----- Attributes -----
  attrs : {
    currentProgramId        : attr('string', {allowNully : true}),
    currentProgramUserInput : attr('node',   {allowNully : true}),
  },


  // ----- Services -----



  // ----- Computed properties -----
  currentProgram : findBy('zen.state.programsData.items', raw('id'), 'currentProgramId'),



  // ----- Methods -----



  // ----- Actions -----
  actions : {
    reset (currentProgramId) {
      this.setAttr("currentProgramId", currentProgramId)

      const payload = this.get("currentProgram").serialize()

      const currentProgramUserInput = this.createChildNode({
        nodeName : "currentProgramUserInput",
        nodeType : "programs-data/program",
        payload,
      })

      this.setAttr("currentProgramUserInput", currentProgramUserInput)
    },

    save () {
      const programNode         = this.get('zen.state.programsProgram.currentProgram')
      const maxTempDurationMins = this.get('maxTempDurationMinsUserInput')

      const rawPayload = {
        name                : this.get('nameUserInput'),
        maxTempBeforeTimer  : this.get('maxTempBeforeTimerUserInput'),
        maxTempBeforeBaking : this.get('maxTempBeforeBakingUserInput'),
        maxTempAfterBaking  : this.get('maxTempAfterBakingUserInput'),
        maxTempDuration     : maxTempDurationMins && maxTempDurationMins * 60,
      }

      const payload = filterObject(rawPayload, (key, value) => value != null)

      programNode
        .dispatchAction('update', payload)
        .then(() => this.dispatchAction('resetAttrs', RESETTABLE_ATTRS))
    },
  },
})
