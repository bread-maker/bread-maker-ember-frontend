// ----- Ember modules -----
// import service from 'ember-service/inject'

// ----- Ember addons -----
import {Node, attr} from 'ember-zen'
// import computed from 'ember-macro-helpers/computed'
import raw from 'ember-macro-helpers/raw'
import findBy from 'ember-awesome-macros/array/find-by'

// ----- Third-party libraries -----
// import RSVP from 'rsvp'

// ----- Own modules -----
// import timeout from 'bread-maker-ember-frontend/utils/timeout'

// ----- Constants -----
const RESETTABLE_NODES = [
]



export default Node.extend({

  // ----- Attributes -----
  attrs : {
    currentProgramId : attr('string', {allowNully : true}),
  },


  // ----- Services -----



  // ----- Computed properties -----
  program : findBy('zen.state.programsData.items', raw('id'), 'currentProgramId'),



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
