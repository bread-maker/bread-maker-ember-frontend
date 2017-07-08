// ----- Ember modules -----
import service from 'ember-service/inject'

// ----- Ember Addon modules -----
import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'
import raw from 'ember-macro-helpers/raw'
import findBy from 'ember-awesome-macros/array/find-by'

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

    'polling',
    'interval',
  ],

  statsIsPending   : false,
  statsIsFulfilled : false,
  statsIsRejected  : false,
  statsIsSettled   : false,
  statsResponse    : undefined,
  statsError       : undefined,

  polling  : true,
  interval : 'sec',


  // ----- Services -----
  ajax : service(),



  // ----- Static properties -----
  intervalOptions : [
    {interval :   'sec', multiplier :  1, label : '8 minutes'},
    {interval :  '5sec', multiplier :  5, label : '40 minutes'},
    {interval : '15sec', multiplier : 15, label : '2 hours'},
    {interval : '30sec', multiplier : 30, label : '4 hours'},
    {interval :   'min', multiplier : 60, label : '8 hours'},
  ],



  // ----- Computed properties -----
  stats      : writable('statsResponse.stats'),
  lastStatus : writable('statsResponse.last_status'),

  currentIntervalOption : findBy('intervalOptions', raw('interval'), 'interval'),

  statsChartData : computed(
    'stats',    'currentIntervalOption',
    (stats = [], currentIntervalOption) => {
      const limit      = 500
      const lastTime   = stats[stats.length - 1].time
      const multiplier = currentIntervalOption.multiplier

      const labels =
        _.times(limit, i => {
          const prior       = (limit - i) * multiplier
          const currentTime = (lastTime - prior) * 1000

          return moment(currentTime).format('LTS')
        })

      return {
        // labels   : stats.map(({time}) => moment(time * 1000).format('LTS')),
        labels,
        yLabels  : ["on", "onoff", "off"],
        datasets : [
          {
            label       : 'Temp',
            yAxisID     : 'temp',
            fill        : false,
            borderColor : "red",
            data        : _.arrayPadLeft(stats.map(({temp}) => _.round(temp, 2)), limit, -1),
            pointRadius : 0,
          },
          {
            label       : 'Target temp',
            yAxisID     : 'temp',
            fill        : false,
            borderColor : "green",
            data        : _.arrayPadLeft(stats.map(({target_temp}) => target_temp ? _.round(target_temp, 2) : -1), limit, -1),
            pointRadius : 0,
          },
          {
            label       : 'Motor',
            yAxisID     : 'motor',
            fill        : true,
            borderColor : "blue",
            data        : _.arrayPadLeft(stats.mapBy('motor'), limit, 'off'),
            pointRadius : 0,
          },
        ],
      }
    }
  ),



  // ----- Methods -----
  request (interval) {
    const ajax = this.get('ajax')
    interval = interval || this.get('zen.state.stats.interval')

    return this.dispatchPromise('stats', () => ajax.getStats(interval))
  },



  // ----- Actions -----
  actions : {
  },
})
