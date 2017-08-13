// ----- Ember modules -----
// import service from 'ember-service/inject'

// ----- Ember addons -----
import {Node, attr} from 'ember-zen'
// import computed from 'ember-macro-helpers/computed'
// import writable from 'ember-macro-helpers/writable'
// import not from 'ember-awesome-macros/not'

// ----- Third-party libraries -----
// import RSVP from 'rsvp'

// ----- Own modules -----
// import timeout from 'bread-maker-ember-frontend/utils/timeout'

// ----- Constants -----
const RESETTABLE_NODES = [
  'maxTempBeforeTimer',
  'maxTempBeforeBaking',
  'maxTempAfterBaking',
  'maxTempDurationMins',
]



export default Node.extend({

  // ----- Attributes -----
  attrs : {
    maxTempBeforeTimerComponent  : attr('node', {nodeType : 'components/settings-field-input-button'}),
    maxTempBeforeBakingComponent : attr('node', {nodeType : 'components/settings-field-input-button'}),
    maxTempAfterBakingComponent  : attr('node', {nodeType : 'components/settings-field-input-button'}),
    maxTempDurationMinsComponent : attr('node', {nodeType : 'components/settings-field-input-button'}),

    lastUpdatedGBCAttr : attr('string', {allowNully : true}),

    oldPasswordUserInput : attr('string'),
    newPasswordUserInput : attr('string'),
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
