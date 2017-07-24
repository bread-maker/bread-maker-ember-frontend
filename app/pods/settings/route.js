// ----- Ember modules -----
import Route from 'ember-route'
// import service from 'ember-service/inject'

// ----- Ember addons -----
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

// ----- Third-party libraries -----
// import RSVP from 'rsvp'

// ----- Own modules -----



export default Route.extend(AuthenticatedRouteMixin, {

  // ----- Services -----



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----



  // ----- Overridden Methods -----
  model () {
    return this
      .get('zen.state.settingsData')
      .requestGlobalBakingConfig()
  },

  resetController (controller, isExiting) {
    if (isExiting) this.get('zen.state.settings').reset()
  },



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  // actions: {
  // }
})
