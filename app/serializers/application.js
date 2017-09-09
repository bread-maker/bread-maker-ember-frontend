// ----- Ember modules -----
import {decamelize} from 'ember-string'

// ----- Ember Data modules -----
import RESTSerializer from 'ember-data/serializers/rest'

// ----- Ember addons -----

// ----- Third-party libraries -----

// ----- Own modules -----



export default RESTSerializer.extend({

  // ----- Services -----



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----



  // ----- Overridden Methods -----
  keyForAttribute (key/*, method*/) {
    return decamelize(key)
  },



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----
})
