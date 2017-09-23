import settingsField from './settings-field'
// import { hasClass } from 'ember-cli-page-object'
import c from './_component'



export default c('.settingsFieldInput', {
  ...settingsField,

  input : c('.settingsFieldInput-input'),
})
