// ----- Ember modules -----
import Controller from '@ember/controller'
import { inject as service } from '@ember/service'
import { observer } from '@ember/object'

// ----- Ember Addon modules -----
import computed from 'ember-macro-helpers/computed'
// import raw from 'ember-macro-helpers/raw'
import writable from 'ember-macro-helpers/writable'
// import {
//   and,
//   findBy,
// } from 'ember-awesome-macros'

// ----- Own modules -----



export default Controller.extend({

  // ----- Services -----
  ajax    : service(),
  dialogs : service(),
  intl    : service(),
  session : service(),
  status  : service(),



  // ----- Query params -----
  queryParams : ['polling', 'interval'],
  interval    : 'sec',
  polling     : 'true',



  // ----- Model -----
  programs : writable('model.programs'),




  // ----- Static properties -----
  isStartModalVisible : false,
  userSelectedProgram : writable('programs.firstObject'),



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
      if (!polling) status.requestStats()
    },

    updatePolling (autoUpdate) {
      const polling = autoUpdate.toString()
      this.setProperties({polling})
    },

    startProgram () {
      const dialogs = this.get('dialogs')
      const intl    = this.get('intl')
      const program = this.get('userSelectedProgram.nameWithHumanId')

      dialogs.confirm({
        message  : intl.t('routes.application.choose-program.confirm', {program}),
        actionOk : () => {}
      })
    },
  },
})
