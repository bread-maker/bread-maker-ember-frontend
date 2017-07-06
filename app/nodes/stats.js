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
  statsResponse    : undefined,
  statsError       : undefined,



  // ----- Services -----
  ajax : service(),



  // ----- Computed properties -----
  stats : computed(
    'statsResponse.last_status',
    lastStatus => {
      if (!lastStatus) return {}

      return {
        time       : lastStatus.time,
        state      : lastStatus.state,
        targetTemp : lastStatus.target_temp,
        temp       : lastStatus.temp,
        motor      : lastStatus.motor,
        pullup     : lastStatus.pullup,
        adc        : lastStatus.adc,
        res        : lastStatus.res,
        pwm        : lastStatus.pwm,
        heat       : lastStatus.heat
      }
    }
  ),



  // ----- Methods -----
  request () {
    const ajax = this.get('ajax')

    return this.dispatchPromise('stats', () => ajax.getStats())
  },



  // ----- Actions -----
  actions : {
  }
})
