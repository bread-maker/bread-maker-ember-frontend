// ----- Ember modules -----
// import computed from 'ember-macro-helpers/computed'

// ----- Own modules -----
import Node from 'ember-zen/node'



export default Node.extend({
  attrNames : [
    'isAuthenticated',
    'isAuthenticating',

    'token',
    'error'
  ],

  isAuthenticated  : false,
  isAuthenticating : false,

  token : undefined,
  error : undefined,



  actions : {
    startAuthentication () {
      this.setProperties({
        isAuthenticated  : false,
        isAuthenticating : true,

        token : null,
        error : null,
      })
    },

    authenticate (token) {
      this.setProperties({
        isAuthenticated  : true,
        isAuthenticating : false,

        token,
        error : null,
      })
    },

    invalidate (error) {
      this.setProperties({
        isAuthenticated  : false,
        isAuthenticating : false,

        token : null,
        error
      })
    },
  },
})
