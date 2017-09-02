// ----- Ember modules -----
import Route from 'ember-route'
import get from 'ember-metal/get'
// import service from 'ember-service/inject'

// ----- Ember addons -----

// ----- Third-party libraries -----
// import RSVP from 'rsvp'

// ----- Own modules -----



export default Route.extend({

  // ----- Services -----



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----



  // ----- Overridden Methods -----
  beforeModel () {
    const programs = this.modelFor('programs').programs

    if (get(programs, 'length')) {
      const id = programs.get('firstObject.id')
      this.transitionTo('programs.program', id)
    }
  },



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  // actions: {
  // }
})
