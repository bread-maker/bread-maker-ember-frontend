// ----- Ember modules -----
import service from 'ember-service/inject'
// import {assert} from 'ember-metal/utils'

// ----- Ember addons -----
import {attr} from 'ember-zen'
import PromiseNode from 'ember-zen/nodes/promise'
// import computed from 'ember-macro-helpers/computed'
// import writable from 'ember-macro-helpers/writable'
import tag from 'ember-awesome-macros/tag'

// ----- Own modules -----



export default PromiseNode.extend({

  // ----- Attributes -----
  attrs : {
    crustId     : attr('number'),
    programId   : attr('number'),
    name        : attr('string'),
    maxTempA    : attr('number', {allowNully : true}),
    maxTempB    : attr('number', {allowNully : true}),
    maxWarmTime : attr('number', {allowNully : true}),
    warmTemp    : attr('number', {allowNully : true}),
    beeps       : [],
    stages      : [],
  },



  // ----- Services -----
  ajax : service(),



  // ----- Computed properties -----
  id : tag`${'programId'}-${'crustId'}`,



  actions : {
    requestAll () {
      const ajax = this.get('ajax')

      this.dispatchAction('run', () => {
        return ajax.getPrograms()
      })
    },
  },
})
