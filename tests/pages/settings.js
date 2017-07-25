import {
  create,
  visitable,
} from 'ember-cli-page-object'

// import c from './components/_component'
import input from './components/settings-field-input-button'




export default create({
  visit : visitable('/settings'),

  // ----- Fields -----
  maxTempBeforeTimer  : {...input, scope : '.route-settings-field._maxTempBeforeTimer'},
  maxTempBeforeBaking : {...input, scope : '.route-settings-field._maxTempBeforeBaking'},
  maxTempAfterBaking  : {...input, scope : '.route-settings-field._maxTempAfterBaking'},
  maxTempDurationMins : {...input, scope : '.route-settings-field._maxTempDurationMins'},
})
