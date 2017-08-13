import Zen from 'ember-zen/service'
import computed from 'ember-macro-helpers/computed'



export default Zen.extend({

  // ----- Services -----



  // ----- Overridden properties -----



  // ----- Static properties -----
  state : computed(function () {
    return this.createNode({
      nodeName : 'state',
      nodeType : 'state',
    })
  }),



  // ----- Computed properties -----



  // ----- Overridden Methods -----



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----
})
