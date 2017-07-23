import {
  create,
  visitable,
} from 'ember-cli-page-object'

import c from './components/_component'




export default create({
  visit : visitable('/login'),

  pendingMessage : c('.route-login-form-pendingMessage'),
  passwordField  : c('.route-login-form-passwordField'),
  submitButton   : c('.route-login-form-submitButton'),
  error          : c('.route-login-form-error'),
})
