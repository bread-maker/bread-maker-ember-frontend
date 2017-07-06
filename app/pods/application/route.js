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
  init () {
    this.get('zen').logStateChangeOnNode('state', '@@INIT')

    this._super(...arguments)
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
