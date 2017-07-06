// ----- Ember modules -----

// ----- Ember addons -----
// import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'
import not from 'ember-awesome-macros/not'

// ----- Own modules -----
import Node from 'ember-zen/node'



export default Node.extend({

  // ----- Attributes -----
  nodeName : 'session',

  attrNames : [
    // 'isAuthenticated',
    // 'isAuthenticating',
    //
    // 'token',
    // 'error'
    'authenticationIsPending',
    'authenticationIsFulfilled',
    'authenticationIsRejected',
    'authenticationIsSettled',
    'authenticationResponse',
    'authenticationError',
  ],

  // isAuthenticated  : false,
  // isAuthenticating : false,
  //
  // token : undefined,
  // error : undefined,

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
    // startAuthentication () {
    //   this.setProperties({
    //     isAuthenticated  : false,
    //     isAuthenticating : true,
    //
    //     token : null,
    //     error : null,
    //   })
    // },
    //
    // authenticate (token) {
    //   this.setProperties({
    //     isAuthenticated  : true,
    //     isAuthenticating : false,
    //
    //     token,
    //     error : null,
    //   })
    // },
    //
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
