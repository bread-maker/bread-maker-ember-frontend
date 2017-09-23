import {
  collection,
  create,
  visitable,
} from 'ember-cli-page-object'

import c from './components/_component'
import select from './components/select'
// import field from './components/settings-field'
import input from './components/settings-field-input'
// import select from './components/settings-field-select'



export default create({
  visit : visitable('/programs/:id'),

  // ----- Menu -----
  programs : collection({
    scope     : '.route-programs-menu',
    itemScope : '.route-programs-menu-item',

    item : c({
      link : c('.route-programs-menu-item-link'),
      id   : c('.route-programs-menu-item-id'),
      name : c('.route-programs-menu-item-name'),
    }),
  }),

  // ----- Current program -----
  name : c('.route-programsProgram-title'),

  stages : collection({
    scope     : '.route-programsProgram-stages',
    itemScope : '.route-programsProgram-stage',

    item : c({
      index       : c('.route-programsProgram-stage-item._index'),
      name        : c('.route-programsProgram-stage-item._stageName .route-programsProgram-stage-field-input'),
      temp        : c('.route-programsProgram-stage-item._temp .route-programsProgram-stage-field-input'),
      motor       : {...select, scope : '.route-programsProgram-stage-item._motor .route-programsProgram-stage-field-input'},
      duration    : c('.route-programsProgram-stage-item._duration .route-programsProgram-stage-field-input'),
      beepsToggle : c('.route-programsProgram-stage-item._beep .route-programsProgram-stage-field-input'),
      remove      : c('.route-programsProgram-stage-item._remove .route-programsProgram-stage-field-input'),

      beeps : {
        add : c('.route-programsProgram-stage-beeps-add'),

        items : collection({
          scope     : '.route-programsProgram-stage-beeps-list._items',
          itemScope : '.route-programsProgram-stage-beep',

          item : c({
            index  : c('.route-programsProgram-stage-beep-field._index'),
            time   : c('.route-programsProgram-stage-beep-field._time .route-programsProgram-stage-beep-field-input'),
            count  : c('.route-programsProgram-stage-beep-field._count .route-programsProgram-stage-beep-field-input'),
            remove : c('.route-programsProgram-stage-beep-field._remove .route-programsProgram-stage-beep-field-input'),
          }),
        }),
      },
    }),
  }),

  fields : c('.route-programsProgram-group._fields', {
    name                : {...input, scope : '.route-programsProgram-fields-field._name'},
    maxTempBeforeTimer  : {...input, scope : '.route-programsProgram-fields-field._maxTempBeforeTimer'},
    maxTempBeforeBaking : {...input, scope : '.route-programsProgram-fields-field._maxTempBeforeBaking'},
    maxTempAfterBaking  : {...input, scope : '.route-programsProgram-fields-field._maxTempAfterBaking'},
    maxTempDurationMins : {...input, scope : '.route-programsProgram-fields-field._maxTempDurationMins'},
  }),

  buttons : {
    save  : c('.route-programsProgram-button._save'),
    reset : c('.route-programsProgram-button._reset'),
  },
})
