// ----- Ember modules -----
// import service from 'ember-service/inject'

// ----- Ember addons -----
import Node from 'ember-zen/node'
// import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'
// import not from 'ember-awesome-macros/not'

// ----- Third-party libraries -----
// import RSVP from 'rsvp'

// ----- Own modules -----
// import timeout from 'bread-maker-ember-frontend/utils/timeout'

// ----- Constants -----
const RESETTABLE_ATTRS = {
  maxTempBeforeTimerUserInput  : writable('zen.state.settingsData.maxTempBeforeTimer'),
  maxTempBeforeBakingUserInput : writable('zen.state.settingsData.maxTempBeforeBaking'),
  maxTempAfterBakingUserInput  : writable('zen.state.settingsData.maxTempAfterBaking'),
  maxTempDurationMinsUserInput : writable('zen.state.settingsData.maxTempDurationMins'),
}



export default Node.extend({

  // ----- Attributes -----
  attrs : {
    oldPasswordUserInput : '',
    newPasswordUserInput : '',

    ...RESETTABLE_ATTRS,
  },


  // ----- Services -----



  // ----- Computed properties -----



  // ----- Methods -----
  reset (attr) {
    if (attr == null) {
      this.dispatchSetProperties('reset', RESETTABLE_ATTRS)
    } else {
      const key = `${attr}UserInput`
      const value = RESETTABLE_ATTRS[key]
      if (!value) throw new Error(`Attempted to reset attr ${key}, but it does not exist`)
      this.dispatchSet(`reset ${key}`, key, value)
    }
  },



  // ----- Actions -----
  actions : {
  },
})

// ToDo: block buttons when promise is running
