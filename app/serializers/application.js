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

  normalizeSaveResponse (store, primaryModelClass, payload, id, requestType) {
    delete payload.result
    return this._super(store, primaryModelClass, payload, id, requestType)
  },



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----
})
