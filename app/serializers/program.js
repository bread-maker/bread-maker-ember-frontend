// ----- Ember modules -----

// ----- Ember addons -----

// ----- Third-party libraries -----

// ----- Own modules -----
import ApplicationSerializer from './application'



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

  normalizeSaveResponse (store, primaryModelClass, payload, id, requestType) {
    const {program, program_id, crust_id} = payload

    program.program_id = program_id
    program.crust_id = crust_id

    return this._super(store, primaryModelClass, payload, id, requestType)
  },



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----
})
