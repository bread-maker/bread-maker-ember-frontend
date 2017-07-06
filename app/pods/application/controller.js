// ----- Ember modules -----
import Controller from 'ember-controller'
import service from 'ember-service/inject'
import on from 'ember-evented/on'

// ----- Ember Addon modules -----
import RunMixin from 'ember-lifeline/mixins/run'

// ----- Own modules -----



export default Controller.extend(RunMixin, {

  // ----- Services -----
  zen : service(),



  // ----- Overridden properties -----
  queryParams : {noPolling : "no_polling"},



  // ----- Static properties -----
  noPolling : "",



  // ----- Computed properties -----



  // ----- Overridden Methods -----



  // ----- Custom Methods -----
  requestStats (next) {
    this
      .get('zen.state.stats')
      .request()
      .then(() => {
        if (!this.get('noPolling.length')) this.runTask(next, 1000)
      })
  },



  // ----- Events and observers -----
  requestStatsOnInit : on('init', function () {
    this.pollTask('requestStats', 'controller:application#requestStats')
  }),



  // ----- Tasks -----



  // ----- Actions -----
  // actions: {
  // }
})
