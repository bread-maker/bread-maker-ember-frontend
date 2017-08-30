// ----- Ember modules -----
import Route from 'ember-route'
import service from 'ember-service/inject'

// ----- Ember addons -----
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'

// ----- Third-party modules -----
import RSVP from 'rsvp'



export default Route.extend(ApplicationRouteMixin, {

  // ----- Services -----
  settings : service(),



  // ----- Overridden methods -----
  beforeModel () {
    const settings = this.get('settings')

    return settings
      .requestMiscConfig()
      .catch(error => {
        settings.applyMiscConfig()
        return RSVP.reject(error)
      })
  },



  // ----- Actions -----
  actions : {
    invalidateSession () {
      this.get('session').invalidate()
    },
  },
})
