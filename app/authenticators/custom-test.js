// ----- Ember modules -----
import service from 'ember-service/inject'

// ----- Ember addons -----
import Base from 'ember-simple-auth/authenticators/base'

// ----- Third-party libraries -----
import RSVP from 'rsvp'



export default Base.extend({

  // ----- Services -----



  // ----- Overridden methods -----
  authenticate (sessionData) {
    this
      .get('zen.state.session')
      .dispatchAction('authenticate', sessionData)

    return RSVP.resolve(sessionData)
  },

  restore (data) {
    return RSVP.resolve(data)
  },



  // ----- Custom methods -----

})
