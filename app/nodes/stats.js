// ----- Ember modules -----
import service from 'ember-service/inject'

// ----- Ember Addon modules -----
import computed from 'ember-macro-helpers/computed'
// import writable from 'ember-macro-helpers/writable'

// ----- Own modules -----
import {Node/*, createNodeCP*/} from 'ember-zen'



export default Node.extend({

  // ----- Attributes -----
  nodeName : 'stats',

  attrNames : [
    'isPending',
    'idFulfilled',
    'isRejected',
    'isSettled',
    'rawResponse',
    'rawError'
  ],

  isPending   : false,
  idFulfilled : false,
  isRejected  : false,
  isSettled   : false,

  rawResponse : undefined,
  rawError    : undefined,



  // ----- Services -----
  ajax : service(),



  // ----- Computed properties -----
  stats : computed(
    'rawResponse.last_status',
    ({
      time,
      state,
      target_temp: targetTemp,
      temp,
      motor,
      pullup,
      adc,
      res,
      pwm,
      heat
    }) => {
      return {
        time,
        state,
        targetTemp,
        temp,
        motor,
        pullup,
        adc,
        res,
        pwm,
        heat
      }
    }
  ),



  // ----- Methods -----
  request () {
    this.dispatch('startRequest')

    return this
      .get('ajax')
      .getStats()
      .then(rawResponse =>
        this.dispatch('fulfillRequest', rawResponse)
      )
      .catch(error => {
        this.dispatch('rejectRequest', error)
      })
  },



  // ----- Actions -----
  actions : {
    startRequest () {
      this.setProperties({
        isPending   : true,
        idFulfilled : false,
        isRejected  : false,
        isSettled   : false,
      })
    },

    fulfillRequest (rawResponse) {
      this.setProperties({
        isPending   : false,
        idFulfilled : true,
        isRejected  : false,
        isSettled   : true,

        rawResponse,
        rawError : null,
      })
    },

    rejectRequest (rawError) {
      this.setProperties({
        isPending   : false,
        idFulfilled : false,
        isRejected  : true,
        isSettled   : true,

        rawResponse : null,
        rawError,
      })
    }
  }
})
