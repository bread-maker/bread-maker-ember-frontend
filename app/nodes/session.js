// ----- Ember modules -----

// ----- Ember addons -----
// import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'
import not from 'ember-awesome-macros/not'

// ----- Own modules -----
import Node from 'ember-zen/node'



export default Node.extend({

  // ----- Attributes -----
  attrNames : [
    'authenticationIsPending',
    'authenticationIsFulfilled',
    'authenticationIsRejected',
    'authenticationIsSettled',
    'authenticationResponse',
    'authenticationError',
  ],

  authenticationIsPending   : false,
  authenticationIsFulfilled : false,
  authenticationIsRejected  : false,
  authenticationIsSettled   : false,
  authenticationResponse    : undefined,
  authenticationError       : undefined,



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
