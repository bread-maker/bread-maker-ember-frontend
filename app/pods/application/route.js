// ----- Ember modules -----
import Route from 'ember-route'
import service from 'ember-service/inject'

// ----- Ember addons -----
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'

// ----- Third-party modules -----
import RSVP from 'rsvp'



export default Route.extend(ApplicationRouteMixin, {

  // ----- Services -----
  zen : service(),



  // ----- Overridden methods -----
  beforeModel () {
    this.get('zen').logStateChangeOnNode('state', '@@INIT')
  },



  model () {
    const zen = this.get('zen')

    return RSVP.hash({
      stats : zen.get('state.stats').request()
    })
  },



  // ----- Actions -----
  actions : {
    authenticateSession (password) {
      this.get('session').authenticate('authenticator:custom', password)
    },

    invalidateSession () {
      this.get('session').invalidate()
    },
  },
})
