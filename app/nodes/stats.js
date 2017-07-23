// ----- Ember modules -----
import EmberObject from 'ember-object'
import service from 'ember-service/inject'

// ----- Ember Addon modules -----
import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'
import raw from 'ember-macro-helpers/raw'
import findBy from 'ember-awesome-macros/array/find-by'
import tag from 'ember-awesome-macros/tag'
import {Node, promiseAttr} from 'ember-zen'

// ----- Third-party libraries -----

// ----- Own modules -----
import t from 'bread-maker-ember-frontend/macros/t'
import {convertTemp} from 'bread-maker-ember-frontend/helpers/format-temp'



const IntervalOption = EmberObject.extend({
  interval  : undefined,
  multipier : undefined,
  intl      : undefined,

  label : t(tag`nodes.stats.interval.${'interval'}`),
})




export default Node.extend({

  // ----- Attributes -----
  attrs : {
    stats : promiseAttr,

    polling  : true,
    interval : 'sec',
  },


  // ----- Services -----
  ajax   : service(),
  intl   : service(),
  moment : service(),



  // ----- Static properties -----
  intervalOptions : computed('intl', intl => [
    /* eslint-disable key-spacing */
    IntervalOption.create({interval :   'sec', multiplier :  1, intl}),
    IntervalOption.create({interval :  '5sec', multiplier :  5, intl}),
    IntervalOption.create({interval : '15sec', multiplier : 15, intl}),
    IntervalOption.create({interval : '30sec', multiplier : 30, intl}),
    IntervalOption.create({interval :   'min', multiplier : 60, intl}),
    /* eslint-enable key-spacing */
  ]),



  // ----- Computed properties -----
  stats      : writable('statsResponse.stats'),
  lastStatus : writable('statsResponse.lastStatus'),

  currentIntervalOption : findBy('intervalOptions', raw('interval'), 'interval'),

  statsChartData : computed(
    'stats',    'currentIntervalOption.multiplier', 'intl', 'moment',       'zen.state.settingsData.locale', 'zen.state.settingsData.timezone',
    (stats = [], multiplier,                         intl,   momentService,  locale) => {
      const limit      = 500
      const lastTime   = stats[stats.length - 1].time

      const labels =
        _.times(limit, i => {
          const prior       = (limit - i) * multiplier
          const currentTime = (lastTime - prior) * 1000

          return momentService.moment(currentTime).format('LTS')
        })

      return {
        labels,

        yLabels : [
          intl.t('domain.motor.on'),
          intl.t('domain.motor.onoff'),
          intl.t('domain.motor.off'),
        ],

        datasets : [
          {
            label       : intl.t('domain.state-labels.temp'),
            yAxisID     : 'temp',
            fill        : false,
            borderColor : "red",
            pointRadius : 0,

            data : _.arrayPadLeft(
              stats.mapBy('temp').map(t => _.round(convertTemp(t, locale), 2)),
              limit,
              -1
            ),
          },
          {
            label       : intl.t('domain.state-labels.target-temp'),
            yAxisID     : 'temp',
            fill        : false,
            borderColor : "green",
            pointRadius : 0,

            data : _.arrayPadLeft(
              stats.mapBy('target_temp').map(t => t ? _.round(convertTemp(t, locale), 2) : convertTemp(-1, locale)),
              limit,
              -1
            ),
          },

          {
            label       : intl.t('domain.state-labels.motor'),
            yAxisID     : 'motor',
            fill        : true,
            borderColor : "blue",
            pointRadius : 0,

            data : _.arrayPadLeft(
              stats.mapBy('motor').map(motor => intl.t(`domain.motor.${motor}`)),
              limit,
              'off'
            ),
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
