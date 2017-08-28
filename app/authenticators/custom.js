// ----- Ember modules -----
import service from 'ember-service/inject'

// ----- Ember addons -----
import Base from 'ember-simple-auth/authenticators/base'

// ----- Third-party libraries -----
// import RSVP from 'rsvp'



export default Base.extend({

  // ----- Services -----
  ajax : service(),



  // ----- Overridden methods -----
  authenticate (password) {
    const ajax = this.get('ajax')
    return ajax.login(password)
  },



  invalidate () {
    const ajax = this.get('ajax')
    return ajax.logout()
  },



  restore ({token}) {
    const ajax = this.get('ajax')

    return ajax
      .confirmAuth(token)
      .then(() => ({token}))
  },

})
