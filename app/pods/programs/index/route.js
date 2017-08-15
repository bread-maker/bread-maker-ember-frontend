// ----- Ember modules -----
import Route from 'ember-route'
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
    const items = this.get('zen.state.programsData.items')

    if (items.get('length')) {
      const id = items.get('firstObject.id')
      this.transitionTo('programs.program', id)
    }
  },

  // resetController (controller, isExiting) {
  //   if (isExiting) this.get('zen.state.programs').reset()
  // },



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  // actions: {
  // }
})
