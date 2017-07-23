// ----- Ember modules -----
// import service from 'ember-service/inject'

// ----- Ember addons -----
import {Node, nodeAttr} from 'ember-zen'
// import computed from 'ember-macro-helpers/computed'
// import writable from 'ember-macro-helpers/writable'
// import not from 'ember-awesome-macros/not'

// ----- Third-party libraries -----
// import RSVP from 'rsvp'

// ----- Own modules -----
// import timeout from 'bread-maker-ember-frontend/utils/timeout'

// ----- Constants -----
const RESETTABLE_NODES = [
  'maxTempBeforeTimerComponent',
  'maxTempBeforeBakingComponent',
  'maxTempAfterBakingComponent',
  'maxTempDurationMinsComponent',
]



export default Node.extend({

  // ----- Attributes -----
  attrs : {
    maxTempBeforeTimerComponent  : nodeAttr('components/settings-field-input-button'),
    maxTempBeforeBakingComponent : nodeAttr('components/settings-field-input-button'),
    maxTempAfterBakingComponent  : nodeAttr('components/settings-field-input-button'),
    maxTempDurationMinsComponent : nodeAttr('components/settings-field-input-button'),

    oldPasswordUserInput : '',
    newPasswordUserInput : '',
  },


  // ----- Services -----



  // ----- Computed properties -----



  // ----- Methods -----
  reset (attr) {
    if (attr) {
      this.resetAttr(attr)
    } else {
      this.resetAttrs()
    }
  },

  resetAttr (attr) {
    const nodeName = `${attr}Component`
    const node = this.get(nodeName)
    node.dispatchAction('reset')
  },

  resetAttrs () {
    RESETTABLE_NODES.forEach(attr => this.resetAttr(attr))
  },



  // ----- Actions -----
  // actions : {
  // },
})
