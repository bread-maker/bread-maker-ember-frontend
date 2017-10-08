// ----- Ember modules -----
import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'
import { observer } from '@ember/object'

// ----- Ember addons -----
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'

// ----- Third-party modules -----
import RSVP from 'rsvp'

// ----- Own modules -----



export default Route.extend(ApplicationRouteMixin, {

  // ----- Services -----
  ajax     : service(),
  config   : service(),
  session  : service(),
  settings : service(),



  // ----- Overridden methods -----
  beforeModel () {
    const ajax      = this.get('ajax')
    const settings  = this.get('settings')
    const isPending = settings.get('miscConfigProxy.isPending')

    if (isPending) return

    const isDev = this.get('config.isDev')

    if (isDev) ajax._setAutorun(true)

    return settings
      .requestMiscConfig()
      .catch(error => {
        settings.applyMiscConfig()
        return RSVP.reject(error)
      })
  },

  model () {
    const store  = this.get('store')
    const isAuth = this.get('session.isAuthenticated')

    return RSVP
      .hash({
        programs : isAuth && store.findAll('program'),
      })
  },



  // ----- Events and observers -----
  refreshOnAuth : observer('session.isAuthenticated', function () {
    this.refresh()
  }),



  // ----- Actions -----
  actions : {
    invalidateSession () {
      this.get('session').invalidate()
    },
  },
})
