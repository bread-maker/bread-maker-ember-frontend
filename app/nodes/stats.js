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
    'statsIsPending',
    'statsIsFulfilled',
    'statsIsRejected',
    'statsIsSettled',
    'statsResponse',
    'statsError'
  ],

  statsIsPending   : false,
  statsIsFulfilled : false,
  statsIsRejected  : false,
  statsIsSettled   : false,

  statsResponse : null,
  statsError    : null,



  // ----- Services -----
  ajax : service(),



  // ----- Computed properties -----
  stats : computed(
    'statsResponse.last_status',
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
    } = {}) => {
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
    const ajax = this.get('ajax')

    this.dispatchPromise('stats', () => ajax.getStats())
  },



  // ----- Actions -----
  actions : {
  }
})
