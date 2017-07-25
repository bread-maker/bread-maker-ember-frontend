import settingsField from './settings-field'
// import { hasClass } from 'ember-cli-page-object'
import c from './_component'



export default c('.settingsFieldInputButton', {
  ...settingsField,

  input  : c('.settingsFieldInputButton-input'),
  submit : c('.settingsFieldInputButton-submit'),
})
