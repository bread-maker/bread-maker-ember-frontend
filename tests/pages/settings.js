import {
  create,
  visitable,
} from 'ember-cli-page-object'

import c from './components/_component'
import field from './components/settings-field'
import input from './components/settings-field-input-button'
import select from './components/settings-field-select'




export default create({
  visit : visitable('/settings'),

  // ----- Fields -----
  maxTempBeforeTimer  : {...input, scope : '.route-settings-field._maxTempBeforeTimer'},
  maxTempBeforeBaking : {...input, scope : '.route-settings-field._maxTempBeforeBaking'},
  maxTempAfterBaking  : {...input, scope : '.route-settings-field._maxTempAfterBaking'},
  maxTempDurationMins : {...input, scope : '.route-settings-field._maxTempDurationMins'},

  locale   : {...select, scope : '.route-settings-field._locale'},
  timezone : {...select, scope : '.route-settings-field._timezone'},

  password : {
    ...field,
    scope  : '.route-settings-field._password',
    old    : c('.route-settings-field-password-old'),
    new    : c('.route-settings-field-password-new'),
    submit : c('.route-settings-field-password-submit'),
  },
})
