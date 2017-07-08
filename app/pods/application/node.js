// ----- Ember modules -----

// ----- Ember addons -----
// import computed from 'ember-macro-helpers/computed'
import raw from 'ember-macro-helpers/raw'
import findBy from 'ember-awesome-macros/array/find-by'

// ----- Own modules -----
import Node from 'ember-zen/node'



export default Node.extend({

  // ----- Attributes -----
  attrNames : [
    'polling',
    'interval',
  ],

  polling  : true,
  interval : 'sec',



  // ----- Static properties -----
  intervalOptions : [
    {interval : 'sec',   label : '8 minutes'},
    {interval : '5sec',  label : '40 minutes'},
    {interval : '15sec', label : '2 hours'},
    {interval : '30sec', label : '4 hours'},
    {interval : 'min',   label : '8 hours'},
  ],



  // ----- Computed properties -----
  currentIntervalOption : findBy('intervalOptions', raw('interval'), 'interval'),
})
