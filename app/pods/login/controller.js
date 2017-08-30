// ----- Ember modules -----
import Controller from 'ember-controller'
import service from 'ember-service/inject'

// ----- Ember Addon modules -----

// ----- Own modules -----
import promiseProxy from 'bread-maker-ember-frontend/macros/promise-proxy'



export default Controller.extend({

  // ----- Services -----
  session : service(),



  // ----- Overridden properties -----



  // ----- Static properties -----
  password : '',



  // ----- Computed properties -----
  authPromise : null,
  authProxy   : promiseProxy('authPromise'),



  // ----- Overridden Methods -----



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  actions : {
    authenticateSession () {
      const session     = this.get('session')
      const password    = this.get('password')
      const authPromise = session.authenticate('authenticator:custom', password)
      this.setProperties({authPromise})
    },
  },
})
