// ----- Ember modules -----
import service from 'ember-service/inject'

// ----- Ember addons -----
import Base from 'ember-simple-auth/authenticators/base'

// ----- Third-party libraries -----
import RSVP from 'rsvp'



export default Base.extend({

  // ----- Services -----
  zen : service(),



  // ----- Overridden methods -----
  authenticate (sessionData) {
    const zen = this.get('zen')

    zen.dispatchSetProperties('state.session', 'authenticate from test adapter', {
      authenticationIsPending   : false,
      authenticationIsFulfilled : true,
      authenticationIsRejected  : false,
      authenticationIsSettled   : false,
      authenticationResponse    : sessionData,
      authenticationError       : null,
    })

    return RSVP.resolve(sessionData)
  },

  restore (data) {
    return RSVP.resolve(data)
  },



  // ----- Custom methods -----

})
