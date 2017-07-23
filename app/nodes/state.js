// ----- Ember modules -----
// import computed from 'ember-macro-helpers/computed'

// ----- Own modules -----
import {Node, nodeAttr} from 'ember-zen'



export default Node.extend({

  // ----- Arguments -----
  attrs : {
    session      : nodeAttr(),
    settingsData : nodeAttr(),
    stats        : nodeAttr(),
    settings     : nodeAttr(),
  },

})
