// import { hasClass } from 'ember-cli-page-object'
import c from './_component'



export default c('.expandedError', {
  title   : c('.expandedError-field._title .expandedError-field-value '),
  message : c('.expandedError-field._message .expandedError-field-value'),
  type    : c('.expandedError-field._type .expandedError-field-value'),
  status  : c('.expandedError-field._status .expandedError-field-value'),
  payload : c('.expandedError-field._payload .expandedError-field-value'),
})
