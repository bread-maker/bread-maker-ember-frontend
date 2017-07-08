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
  attrNames : [
    'statsIsPending',
    'statsIsFulfilled',
    'statsIsRejected',
    'statsIsSettled',
    'statsResponse',
    'statsError',
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
      labels   : stats.map(({time}) => moment(time * 1000).format('LTS')),
      yLabels  : ["on", "onoff", "off"],
      datasets : [
        {
          label       : 'Temp',
          yAxisID     : 'temp',
          fill        : false,
          borderColor : "red",
          data        : stats.map(({temp}) => _.round(temp, 2)),
          pointRadius : 0,
        },
        {
          label       : 'Target temp',
          yAxisID     : 'temp',
          fill        : false,
          borderColor : "green",
          data        : stats.map(({target_temp}) => target_temp ? _.round(target_temp, 2) : -1),
          pointRadius : 0,
        },
        {
          label       : 'Motor',
          yAxisID     : 'motor',
          fill        : true,
          borderColor : "blue",
          data        : stats.mapBy('motor'),
          pointRadius : 0,
        },
      ],
    }
  }),



  // ----- Methods -----
  request (interval) {
    const ajax = this.get('ajax')
    interval = interval || this.get('zen.state.application.interval')

    return this.dispatchPromise('stats', () => ajax.getStats(interval))
  },



  // ----- Actions -----
  actions : {
  },
})
