import { hasClass } from 'ember-cli-page-object'
import c from './_component'



export default c('.settingsField', {
  label       : c('.settingsField-label'),
  description : c('.settingsField-description'),
  status      : c('.settingsField-status', {
    isPending  : hasClass('-pending'),
    isRejected : hasClass('-rejected'),
  }),
})
