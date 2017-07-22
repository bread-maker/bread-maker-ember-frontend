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
  model () {
    return this
      .get('zen.state.settings')
      .requestGlobalBakingConfig()
  },

  deactivate () {
    this.get('zen.state.preferences').reset()
  },



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  // actions: {
  // }
})
