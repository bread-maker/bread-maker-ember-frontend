// ----- Ember modules -----
import Controller from '@ember/controller'
import { inject as service } from '@ember/service'

// ----- Ember Addon modules -----
// import {or} from 'ember-awesome-macros'
import reads from 'ember-macro-helpers/reads'

// ----- Own modules -----
import promiseProxy from 'bread-maker-ember-frontend/macros/promise-proxy'
import ShouldPauseTestMixin from 'bread-maker-ember-frontend/mixins/should-pause-test'



export default Controller.extend(ShouldPauseTestMixin, {

  // ----- Services -----
  session : service(),



  // ----- Overridden properties -----
  // shouldPauseTest : reads('authProxy.isPending'),



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
