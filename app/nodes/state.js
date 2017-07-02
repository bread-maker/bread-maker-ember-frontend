// ----- Ember modules -----
// import computed from 'ember-macro-helpers/computed'

// ----- Own modules -----
import {Node, createNodeCP} from 'ember-zen'



export default Node.extend({

  // ----- Arguments -----
  nodeName : 'state',

  attrNames : [
    'session',
    'stats',
  ],

  session : createNodeCP('session'),
  stats   : createNodeCP('stats'),
})
