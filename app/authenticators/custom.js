// ----- Ember modules -----
import service from 'ember-service/inject'

// ----- Ember addons -----
import Base from 'ember-simple-auth/authenticators/base'

// ----- Third-party libraries -----
import RSVP from 'rsvp'



export default Base.extend({

  // ----- Services -----
  ajax : service(),
  zen  : service(),



  // ----- Overridden methods -----
  authenticate (password) {
    const zen = this.get('zen')
    const ajax = this.get('ajax')

    return zen
      .dispatchPromise('state.session', 'authentication', () => ajax.login(password))
  },



  invalidate () {
    this.get('zen').dispatchAction('state.session', 'invalidate')

    return RSVP.resolve()
  },



  restore ({token}) {
    const zen = this.get('zen')
    const ajax = this.get('ajax')

    return zen
      .dispatchPromise('state.session', 'authentication', () => {
        return ajax
          .confirmAuth({token})
          .then(() => ({token}))
      })
  },



  // ----- Custom methods -----

})
