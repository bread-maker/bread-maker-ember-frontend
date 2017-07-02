// ----- Ember modules -----
import Controller from 'ember-controller'
import service from 'ember-service/inject'

// ----- Ember Addon modules -----

// ----- Own modules -----



export default Controller.extend({

  // ----- Services -----
  session : service(),



  // ----- Overridden properties -----



  // ----- Static properties -----
  password : '',



  // ----- Computed properties -----



  // ----- Overridden Methods -----



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  actions : {
    login () {
      const password = this.get('password')
      this.send('authenticateSession', password)
    }
  }
})
