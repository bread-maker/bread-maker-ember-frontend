// ----- Ember modules -----

// ----- Ember addons -----

// ----- Third-party libraries -----

// ----- Own modules -----
import ApplicationAdapter from './application'



export default ApplicationAdapter.extend({

  // ----- Services -----



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----



  // ----- Overridden Methods -----
  apiMethodForRequest ({requestType}) {
    switch (requestType) {
      case 'findAll':
        return 'config.baking.stages.get.all'
      case 'findRecord':
        return 'config.baking.stages.get'
      case 'updateRecord':
        return 'config.baking.stages.set'
    }
  },

  paramsFor__findRecord ({id}) {
    const [program_id, crust_id] = id.split('-')

    return {
      program_id,
      crust_id,
    }
  },

  paramsFor__updateRecord ({store, type, snapshot}) {
    const data = {}
    const serializer = store.serializerFor(type.modelName)

    serializer.serializeIntoHash(data, type, snapshot)

    data.program_id = data.program.program_id
    data.crust_id = data.program.crust_id

    return data
  },



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----
})
