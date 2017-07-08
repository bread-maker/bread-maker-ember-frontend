// ----- Ember modules -----
// import computed from 'ember-macro-helpers/computed'

// ----- Own modules -----
import {Node, createNodeCP} from 'ember-zen'



export default Node.extend({

  // ----- Arguments -----
  attrNames : [
    'session',
    'settings',
    'stats',
  ],

  session  : createNodeCP('session'),
  settings : createNodeCP('settings'),
  stats    : createNodeCP('stats'),
})
