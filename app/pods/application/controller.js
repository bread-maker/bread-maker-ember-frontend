// ----- Ember modules -----
import Controller from 'ember-controller'
import service from 'ember-service/inject'
import on from 'ember-evented/on'
import observer from 'ember-metal/observer'
import {next} from 'ember-runloop'

// ----- Ember Addon modules -----
import RunMixin from 'ember-lifeline/mixins/run'

// ----- Own modules -----

// ----- Constants -----
const REQUEST_STATS_POLL_ID = 'controller:application#requestStats'



export default Controller.extend(RunMixin, {

  // ----- Services -----
  zen : service(),



  // ----- Overridden properties -----
  queryParams : ['polling', 'interval'],
  polling     : 'true',
  interval    : 'sec',




  // ----- Static properties -----
  requestStatsTaskId : undefined,



  // ----- Computed properties -----



  // ----- Overridden Methods -----



  // ----- Custom Methods -----
  requestStats () {
    return this.get('zen.state.stats').request()
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
  consumeQueryParamsOnInit : on('init', function () {
    next(() => {
      this.updateIntervalFromQueryParam()
      this.updatePollingFromQueryParam()
      this.requestStats()
    })
  }),

  updateIntervalFromQueryParam : observer('interval', function () {
    const interval = this.get('interval')
    const zen = this.get('zen')

    zen.dispatchSet('state.stats', 'interval query param', 'interval', interval)
  }),

  updatePollingFromQueryParam : observer('polling', function () {
    const polling = this.get('polling')
    const pollingEffective = polling && polling !== 'false'

    const zen = this.get('zen')

    zen.dispatchSet('state.stats', 'polling query param', 'polling', pollingEffective)

    if (pollingEffective) {
      this.pollTask('requestStatsPoll', REQUEST_STATS_POLL_ID)
    } else {
      next(() => {
        const requestStatsTaskId = this.get('requestStatsTaskId')
        this.cancelTask(requestStatsTaskId)
        this.cancelPoll(REQUEST_STATS_POLL_ID)
      })
    }
  }),



  // ----- Tasks -----



  // ----- Actions -----
  actions : {
    updatePolling (autoUpdate) {
      const polling = autoUpdate.toString()
      this.setProperties({polling})
    },
  },
})
