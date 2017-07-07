// ----- Ember modules -----
import Component from 'ember-component'


// ----- Ember addons -----

// ----- Third-party libraries -----

// ----- Own modules -----



export default Component.extend({

  // ----- Arguments -----
  data : null,



  // ----- Services -----



  // ----- Overridden properties -----
  classNames : ['statsChart'],



  // ----- Properties -----
  options : {
    animation  : false,
    responsive : true,
    scales     : {
      yAxes : [
        {
          id       : "temp",
          type     : "linear",
          position : "left",
          ticks    : {
            beginAtZero : true,
            min         : 0,
          },
        },
        {
          id       : "motor",
          type     : "category",
          position : "right",
        },
      ],
    },
  },



  // ----- Computed properties -----



  // ----- Overridden Methods -----



  // ----- Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  // actions: {
  // }
})
