// ----- Ember modules -----
import service from 'ember-service/inject'
// import {assert} from 'ember-metal/utils'

// ----- Ember addons -----
import {attr} from 'ember-zen'
import PromiseNode from 'ember-zen/nodes/promise'
// import computed from 'ember-macro-helpers/computed'
// import writable from 'ember-macro-helpers/writable'
import {divide, tag} from 'ember-awesome-macros'

// ----- Own modules -----



export default PromiseNode.extend({

  // ----- Attributes -----
  attrs : {
    crustId   : attr('number'),
    programId : attr('number'),
    name      : attr('string'),

    maxTempBeforeTimer  : attr('number', {allowNully : true}),
    maxTempBeforeBaking : attr('number', {allowNully : true}),
    maxTempAfterBaking  : attr('number', {allowNully : true}),
    maxTempDuration     : attr('number', {allowNully : true}),

    beeps  : [],
    stages : [],
  },



  // ----- Services -----
  ajax : service(),



  // ----- Computed properties -----
  id                  : tag`${'programId'}-${'crustId'}`,
  maxTempDurationMins : divide('maxTempDuration', 60),



  actions : {
    update (obj) {
      const ajax          = this.get('ajax')
      const previousState = this.serialize()
      const newState      = {...previousState, ...obj}

      return this
        .dispatchAction('run', () => ajax.setProgram(newState))

        .then(response => {
          this.dispatchPopulate('update program node after updating program on server', response)
        })
    },
  },
})
