// ----- Ember modules -----
// import computed from 'ember-macro-helpers/computed'

// ----- Own modules -----
import {Node, attr} from 'ember-zen'



export default Node.extend({

  // ----- Arguments -----
  attrs : {
    programsData : attr('node'),
    session      : attr('node'),
    settingsData : attr('node'),
    stats        : attr('node'),

    // ----- Routes -----
    programsProgram : attr('node', {nodeType : 'programs/program'}),
    settings        : attr('node'),
  },

})
