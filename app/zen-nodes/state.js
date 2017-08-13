// ----- Ember modules -----
// import computed from 'ember-macro-helpers/computed'

// ----- Own modules -----
import {Node, attr} from 'ember-zen'



export default Node.extend({

  // ----- Arguments -----
  attrs : {
    session      : attr('node'),
    settingsData : attr('node'),
    stats        : attr('node'),
    settings     : attr('node'),
  },

})
