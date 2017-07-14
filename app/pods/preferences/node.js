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



export default Node.extend({

  // ----- Attributes -----
  attrs : {
    oldPasswordUserInput : '',
    newPasswordUserInput : '',
  },


  // ----- Services -----



  // ----- Computed properties -----
  maxTempBeforeTimerUserInput  : writable('zen.state.settings.maxTempBeforeTimer'),
  maxTempBeforeBakingUserInput : writable('zen.state.settings.maxTempBeforeBaking'),
  maxTempAfterBakingUserInput  : writable('zen.state.settings.maxTempAfterBaking'),
  maxTempDurationUserInput     : writable('zen.state.settings.maxTempDuration'),
  maxTempDurationMinsUserInput : writable('zen.state.settings.maxTempDurationMins'),



  // ----- Methods -----



  // ----- Actions -----
  actions : {
  },
})

// ToDo: reset user input on entering route
// ToDo: block buttons when promise is running
