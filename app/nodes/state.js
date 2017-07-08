// ----- Ember modules -----
// import computed from 'ember-macro-helpers/computed'

// ----- Own modules -----
import {Node, createNodeCP} from 'ember-zen'



export default Node.extend({

  // ----- Arguments -----
  attrNames : [
    'session',
    'stats',

    'application',
  ],

  session : createNodeCP('session'),
  stats   : createNodeCP('stats'),

  application : createNodeCP('application'),
})
