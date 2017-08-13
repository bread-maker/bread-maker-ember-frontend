import {
  collection,
  create,
  visitable,
} from 'ember-cli-page-object'

import c from './components/_component'

import stats from './components/stats-x'



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
})
