// ----- Ember modules -----
import Controller from 'ember-controller'
import service from 'ember-service/inject'

// ----- Ember addons -----
import computed from 'ember-macro-helpers/computed'

// ----- Third-party libraries -----
import moment from 'moment'

// ----- Own modules -----



export default Controller.extend({

  // ----- Services -----
  intl : service(),



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----
  timezones : computed(() => moment.tz.names()),



  // ----- Overridden Methods -----



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  // actions : {
  // },
})
