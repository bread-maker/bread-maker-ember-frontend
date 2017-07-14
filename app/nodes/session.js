// ----- Ember modules -----

// ----- Ember addons -----
import {Node, promiseAttr} from 'ember-zen'
// import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'
import not from 'ember-awesome-macros/not'

// ----- Own modules -----



export default Node.extend({

  // ----- Attributes -----
  attrs : {
    authentication : promiseAttr,
  },



  // ----- Computed properties -----
  token           : writable('authenticationResponse.token'),
  isAuthenticated : not(not('token')),



  actions : {
    invalidate () {
      this.setProperties({
        authenticationIsPending   : false,
        authenticationIsFulfilled : false,
        authenticationIsRejected  : false,
        authenticationIsSettled   : false,
        authenticationResponse    : null,
        authenticationError       : null,
      })
    },
  },
})
