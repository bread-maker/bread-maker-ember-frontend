// ----- Ember modules -----
import service from 'ember-service/inject'

// ----- Ember Addon modules -----
import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'

// ----- Third-party libraries -----
import moment from 'moment'

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
  stats      : writable('statsResponse.stats'),
  lastStatus : writable('statsResponse.last_status'),

  statsChartData : computed('stats', (stats = []) => {
    return {
      labels   : stats.map(({time}) => moment(time).format('LTS')),
      datasets : [
        {
          label : 'Temp',
          data  : stats.map(({temp}) => _.round(temp, 2))
        }
      ]
    }
  }),



  // ----- Methods -----
  request () {
    const ajax = this.get('ajax')

    return this.dispatchPromise('stats', () => ajax.getStats('min'))
  },



  // ----- Actions -----
  actions : {
  }
})
