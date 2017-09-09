// ----- Ember modules -----
import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

// ----- Ember addons -----
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'

// ----- Third-party modules -----
import RSVP from 'rsvp'



export default Route.extend(ApplicationRouteMixin, {

  // ----- Services -----
  session  : service(),
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

  // beforeModel () {
  //   const session  = this.get('session')
  //   const settings = this.get('settings')
  //
  //   return session
  //     .restore()
  //     .then(() => settings.requestMiscConfig())
  //     .catch(error => {
  //       settings.applyMiscConfig()
  //       return RSVP.reject(error)
  //     })
  // },



  // ----- Actions -----
  actions : {
    invalidateSession () {
      this.get('session').invalidate()
    },
  },
})
