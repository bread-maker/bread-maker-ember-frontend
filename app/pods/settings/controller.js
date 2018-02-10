// ----- Ember modules -----
import Controller from '@ember/controller'
import { inject as service } from '@ember/service'

// ----- Ember addons -----
import {or} from 'ember-awesome-macros'
import computed from 'ember-macro-helpers/computed'

// ----- Third-party libraries -----
import moment from 'moment'
import RSVP from 'rsvp'

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
  dialogs  : service(),
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

  currentSSID : null,



  // ----- Computed properties -----
  timezones            : computed(() => moment.tz.names()),
  currentSSIDEffective : or('currentSSID', 'settings.wifiStatusProxy.content.ssid'),



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



    wifiStatusUpdate () {
      const settings = this.get('settings')
      settings.wifiGetStatus()
    },



    wifiScan () {
      const settings = this.get('settings')
      settings.wifiGetScan()
    },



    wifiConnect (point) {
      const settings = this.get('settings')
      const dialogs  = this.get('dialogs')
      const {ssid, encryption} = point

      this.set('currentSSID', ssid)

      const keyPromise =
        (encryption && encryption !== 'NONE')
          ? dialogs.prompt({
            message : `Please enter a key for "${point.ssid}" access point`,
          })
          : RSVP.resolve()

      keyPromise
        .then(key => settings.wifiConnect(ssid, encryption, key))
        .then(()  => settings.wifiGetStatus())
        .catch(error => dialogs.alert(error.message)) // ToDo: format error
        .finally(()  => this.set('currentSSID', null))
    },



    wifiDisconnect () {
      const settings = this.get('settings')

      settings
        .wifiConnect()
        .then(() => settings.wifiGetStatus())
    },
  },
})
