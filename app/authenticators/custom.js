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

    zen.dispatch('state.session', 'startAuthentication')

    return this
      .get('ajax')

      .login(password)

      .then(data => {
        return data.error
          ? RSVP.reject(data.error)
          : data
      })

      .then(({token}) => {
        zen.dispatch('state.session', 'authenticate', token)
        return {token}
      })

      .catch(data => this._reportErrorAndInvalidate(data))
  },



  invalidate (...args) {
    return this
      ._super(...args)

      .then(data => {
        this.get('zen').dispatch('state.session', 'invalidate')
        return data
      })
  },



  restore ({token}) {
    return this
      .get('ajax')

      .getMethod('config.timezone.get', {token})

      .then(() => {
        this.get('zen').dispatch('state.session', 'authenticate', token)
        return {token}
      })

      .catch(() => {
        this.get('zen').dispatch('state.session', 'invalidate')
        return RSVP.reject()
      })
  },



  // ----- Custom methods -----
  _reportErrorAndInvalidate (error) {
    console.error('Authentication failed:', error)
    this.get('zen').dispatch('state.session', 'invalidate', error)
    return RSVP.reject(error)
  },
})
