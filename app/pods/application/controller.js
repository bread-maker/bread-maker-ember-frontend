// ----- Ember modules -----
import Controller from 'ember-controller'
import service from 'ember-service/inject'
import observer from 'ember-metal/observer'

// ----- Ember Addon modules -----
import computed from 'ember-macro-helpers/computed'
import RunMixin from 'ember-lifeline/mixins/run'

// ----- Own modules -----
import {REQUEST_STATS_POLL_ID} from 'bread-maker-ember-frontend/constants'



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
  pollingEffective : computed('polling', polling => {
    return polling && polling !== 'false'
  }),



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
  updateIntervalFromQueryParam : observer('interval', function () {
    const interval = this.get('interval')
    const zen      = this.get('zen')

    zen.dispatchSet('state.stats', 'interval query param', 'interval', interval)
  }),

  updatePollingFromQueryParam : observer('pollingEffective', function () {
    const pollingEffective = this.get('pollingEffective')

    const zen = this.get('zen')

    zen.dispatchSet('state.stats', 'polling query param', 'polling', pollingEffective)

    if (pollingEffective) {
      this.pollTask('requestStatsPoll', REQUEST_STATS_POLL_ID)
    } else {
      const requestStatsTaskId = this.get('requestStatsTaskId')
      this.cancelTask(requestStatsTaskId)
      this.cancelPoll(REQUEST_STATS_POLL_ID)
    }
  }),



  // ----- Tasks -----



  // ----- Actions -----
  actions : {
    didReceiveQueryParams () {
      const pollingEffective = this.get('pollingEffective')

      if (pollingEffective) {
        this.updatePollingFromQueryParam()
      } else {
        const zen = this.get('zen')
        zen.dispatchSet('state.stats', 'polling query param', 'polling', pollingEffective)
        this.requestStats()
      }
    },

    updatePolling (autoUpdate) {
      const polling = autoUpdate.toString()
      this.setProperties({polling})
    },
  },
})
