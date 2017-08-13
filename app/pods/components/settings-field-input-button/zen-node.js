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




export default Node.extend({

  // ----- Attributes -----
  attrs : {
    userInput : attr('string', {allowNully : true}),
  },


  // ----- Services -----



  // ----- Computed properties -----



  // ----- Methods -----



  // ----- Actions -----
  actions : {
    reset () {
      this.setAttr('userInput', null)
    },
  },
})

