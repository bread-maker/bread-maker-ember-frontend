// ----- Ember modules -----
import Service, {inject as service} from '@ember/service'
import EmberObject, {observer} from '@ember/object'

// ----- Ember addon modules -----
import computed from 'ember-macro-helpers/computed'
import raw from 'ember-macro-helpers/raw'
import writable from 'ember-macro-helpers/writable'

import {tag} from 'ember-awesome-macros'
import {findBy} from 'ember-awesome-macros/array'

import RunMixin from 'ember-lifeline/mixins/run'

// ----- Third-party modules -----
import _ from 'lodash'

// ----- Own modules -----
import cache from 'bread-maker-ember-frontend/macros/cache'
import t from 'bread-maker-ember-frontend/macros/t'
import {REQUEST_STATS_POLL_ID} from 'bread-maker-ember-frontend/constants'
import {convertTemp} from 'bread-maker-ember-frontend/helpers/format-temp'
import promiseProxy from 'bread-maker-ember-frontend/macros/promise-proxy'



const IntervalOption = EmberObject.extend({
  interval  : undefined,
  multipier : undefined,
  intl      : undefined,

  label : t(tag`nodes.stats.interval.${'interval'}`),
})



export default Service.extend(RunMixin, {

  // ----- Services -----
  ajax     : service(),
  intl     : service(),
  moment   : service(),
  settings : service(),



  // ----- Overridden properties -----



  // ----- Static properties -----
  interval           : null,
  polling            : null,
  requestStatsTaskId : undefined,

  intervalOptions : computed('intl', intl => [
    /* eslint-disable key-spacing */
    IntervalOption.create({interval :   'sec', multiplier :  1, intl}),
    IntervalOption.create({interval :  '5sec', multiplier :  5, intl}),
    IntervalOption.create({interval : '15sec', multiplier : 15, intl}),
    IntervalOption.create({interval : '30sec', multiplier : 30, intl}),
    IntervalOption.create({interval :   'min', multiplier : 60, intl}),
    /* eslint-enable key-spacing */
  ]),



  // ----- Promises -----
  statsPromise      : null,
  statsContentCache : null,
  statsProxy        : promiseProxy('statsPromise'),
  statsContent      : cache('statsProxy.content', 'statsContentCache'),
  stats             : writable('statsContent.stats'),



  // ----- Computed properties -----

  currentIntervalOption : findBy('intervalOptions', raw('interval'), 'interval'),

  statsChartData : computed(
    'stats',    'currentIntervalOption.multiplier', 'intl', 'moment',       'settings.locale', 'settings.timezone',
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



  // ----- Overridden Methods -----



  // ----- Custom Methods -----
  requestStats () {
    const ajax         = this.get('ajax')
    const interval     = this.get('interval')
    const statsPromise = ajax.getStats(interval)
    this.setProperties({statsPromise})
    return statsPromise
  },

  requestStatsPoll (next) {
    this
      .requestStats()
      .finally(() => {
        const requestStatsTaskId = this.runTask(next, 1000)
        this.setProperties({requestStatsTaskId})
      })
  },



  // ----- Events and observers -----
  updatePolling : observer('polling', function () {
    const polling = this.get('polling')

    if (polling) {
      this.pollTask('requestStatsPoll', REQUEST_STATS_POLL_ID)
    } else {
      const requestStatsTaskId = this.get('requestStatsTaskId')
      this.cancelTask(requestStatsTaskId)
      this.cancelPoll(REQUEST_STATS_POLL_ID)
    }
  }),



  // ----- Tasks -----

})
