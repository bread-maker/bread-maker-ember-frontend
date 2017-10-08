import {
  collection,
  create,
  visitable,
} from 'ember-cli-page-object'

import c from './components/_component'

import select from './components/select'
import stats from './components/stats-x'
import modal, {backdrop} from './components/modal-x'



export default create({
  visit : visitable('/'),

  menu : c('.route-application-menu', {
    items : collection({
      itemScope : '.route-application-menu-item',
    }),

    chart    : c('.route-application-menu-item._chart'),
    login    : c('.route-application-menu-item._login'),
    logout   : c('.route-application-menu-item._logout'),
    programs : c('.route-application-menu-item._programs'),
    settings : c('.route-application-menu-item._settings'),
  }),

  stats,

  statsError : c('.route-application-statsError', {
    message : c('.route-application-statsError-message'),
    time    : c('.route-application-statsError-time'),
  }),

  start              : c('.route-application-start'),
  startModalBackdrop : backdrop,
  startModal         : {
    ...modal,

    message  : c('.route-application-startModal-message'),
    programs : {...select, scope : '.route-application-startModal-programs'},
  },
})
