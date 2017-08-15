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
  model ({id}) {
    const items = this.get('zen.state.programsData.items')
    const currentProgram = items.findBy('id', id)

    if (!currentProgram) this.transitionTo('programs.index')

    this
      .get('zen.state.programsProgram')
      .dispatchSet('current program id from URL segment', 'currentProgramId', id)
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
