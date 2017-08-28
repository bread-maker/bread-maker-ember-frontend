// ----- Ember modules -----
import Controller from 'ember-controller'
import service from 'ember-service/inject'
import observer from 'ember-metal/observer'

// ----- Ember Addon modules -----
import computed from 'ember-macro-helpers/computed'
// import raw from 'ember-macro-helpers/raw'
// import writable from 'ember-macro-helpers/writable'
// import {
//   and,
//   findBy,
// } from 'ember-awesome-macros'

// ----- Own modules -----



export default Controller.extend({

  // ----- Services -----
  ajax    : service(),
  session : service(),
  status  : service(),



  // ----- Query params -----
  queryParams : ['polling', 'interval'],
  interval    : 'sec',
  polling     : 'true',




  // ----- Static properties -----



  // ----- Computed properties -----
  pollingEffective : computed('polling', polling => {
    return polling && polling !== 'false'
  }),



  // ----- Overridden Methods -----



  // ----- Custom Methods -----



  // ----- Events and observers -----
  updatePollingFromQP : observer('pollingEffective', function () {
    const polling  = this.get('pollingEffective')
    const status   = this.get('status')

    status.setProperties({polling})
  }),

  updateIntervalFromQP : observer('interval', function () {
    const interval = this.get('interval')
    const status   = this.get('status')
    const polling  = this.get('pollingEffective')

    status.setProperties({interval})
    if (!polling) status.requestStats()
  }),



  // ----- Tasks -----



  // ----- Actions -----
  actions : {
    didReceiveQueryParams () {
      const interval = this.get('interval')
      const polling  = this.get('pollingEffective')
      const status   = this.get('status')

      status.setProperties({interval, polling})
    },

    updatePolling (autoUpdate) {
      const polling = autoUpdate.toString()
      this.setProperties({polling})
    },
  },
})
