// ----- Ember modules -----

// ----- Ember addons -----

// ----- Third-party libraries -----

// ----- Own modules -----
import ApplicationSerializer from './application'
import {camelizeKeys, decamelizeKeys} from 'bread-maker-ember-frontend/utils/serialization'



export default ApplicationSerializer.extend({

  // ----- Services -----



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----



  // ----- Overridden Methods -----
  extractId (modelClass, resourceHash) {
    const {program_id, crust_id} = resourceHash
    return `${program_id}-${crust_id}`
  },

  keyForAttribute (key, method) {
    /* eslint-disable indent */
    const effectiveKey =
      key === 'maxTempBeforeTimer'  ? 'max_temp_a'    :
      key === 'maxTempBeforeBaking' ? 'max_temp_b'    :
      key === 'maxTempAfterBaking'  ? 'warm_temp'     :
      key === 'maxTempDurationMins' ? 'max_warm_time' :
                                      this._super(key, method)
    /* eslint-enable indent*/

    return effectiveKey
  },

  normalize (modelClass, hash, prop) {
    hash.stages = hash.stages && hash.stages.map(camelizeKeys)
    hash.beeps  = hash.beeps  && hash.beeps .map(camelizeKeys)

    return this._super(modelClass, hash, prop)
  },

  normalizeSaveResponse (store, primaryModelClass, payload, id, requestType) {
    const {program} = payload

    program.program_id = payload.program_id
    delete payload.program_id

    program.crust_id = payload.crust_id
    delete payload.crust_id

    return this._super(store, primaryModelClass, payload, id, requestType)
  },

  serialize (snapshot, options) {
    const hash = this._super(snapshot, options)

    hash.stages = hash.stages && hash.stages.map(decamelizeKeys)
    hash.beeps  = hash.beeps  && hash.beeps .map(decamelizeKeys)

    return hash
  },



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----
})
