// ----- Ember modules -----
import Route from '@ember/routing/route'
// import { inject as service } from '@ember/service'

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
  model ({humanId}) {
    const parentModel    = this.modelFor('programs')
    const store          = this.get('store')
    const id             = humanId.split('-').map(n => parseInt(n, 10) - 1).join('-')
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
