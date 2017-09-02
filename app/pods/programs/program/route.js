// ----- Ember modules -----
import Route from 'ember-route'
// import service from 'ember-service/inject'

// ----- Ember addons -----

// ----- Third-party libraries -----
import RSVP from 'rsvp'

// ----- Own modules -----



export default Route.extend({

  // ----- Services -----



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----



  // ----- Overridden Methods -----
  model ({id}) {
    const parentModel    = this.modelFor('programs')
    const store          = this.get('store')
    const currentProgram = store.peekRecord('program', id)

    if (!currentProgram) this.transitionTo('programs')

    return RSVP.hash({
      ...parentModel,
      currentProgramId : id,
      currentProgram,
    })
  },



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  // actions: {
  // }
})
