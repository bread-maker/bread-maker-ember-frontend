// ----- Ember modules -----
import Controller from 'ember-controller'
import service from 'ember-service/inject'

// ----- Ember addons -----
import computed from 'ember-macro-helpers/computed'

// ----- Third-party libraries -----
import moment from 'moment'

// ----- Own modules -----

// ----- Constants -----
const RESETTABLE_ATTRS = [
  'maxTempBeforeTimer',
  'maxTempBeforeBaking',
  'maxTempAfterBaking',
  'maxTempDurationMins',
  'oldPassword',
  'newPassword',
]



export default Controller.extend({

  // ----- Services -----
  intl     : service(),
  moment   : service(),
  settings : service(),



  // ----- Overridden properties -----



  // ----- Static properties -----
  maxTempBeforeTimer  : null,
  maxTempBeforeBaking : null,
  maxTempAfterBaking  : null,
  maxTempDurationMins : null,
  oldPassword         : null,
  newPassword         : null,

  lastUpdatedGBCAttr  : null,
  lastUpdatedMiscAttr : null,



  // ----- Computed properties -----
  timezones : computed(() => moment.tz.names()),



  // ----- Overridden Methods -----



  // ----- Custom Methods -----
  reset (attrs = RESETTABLE_ATTRS) {
    attrs.forEach(attr => this.resetAttr(attr))
  },

  resetAttr (attr) {
    this.set(attr, null)
  },



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  actions : {
    setGlobalBakingConfig (attr, value) {
      this.set('lastUpdatedGBCAttr', attr)

      const settings = this.get('settings')

      settings
        .setGlobalBakingConfig(attr, value)
        .then(() => this.resetAttr(attr))
    },



    setMiscConfig (attr, value) {
      this.set('lastUpdatedMiscAttr', attr)

      const settings = this.get('settings')

      settings
        .setMiscConfig(attr, value)
        .then(() => this.resetAttr(attr))
    },



    setPassword () {
      const settings    = this.get('settings')
      const oldPassword = this.get('oldPassword')
      const newPassword = this.get('newPassword')

      settings
        .setPassword(oldPassword, newPassword)
        .then(() => this.reset(['oldPassword', 'newPassword']))
    },
  },
})
