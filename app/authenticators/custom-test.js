// ----- Ember modules -----
// import { inject as service } from '@ember/service'

// ----- Ember addons -----
import Base from 'ember-simple-auth/authenticators/base'

// ----- Third-party libraries -----
import RSVP from 'rsvp'



export default Base.extend({

  // ----- Services -----



  // ----- Overridden methods -----
  authenticate (data) {
    return RSVP.resolve(data)
  },

  restore (data) {
    return RSVP.resolve(data)
  },



  // ----- Custom methods -----

})
