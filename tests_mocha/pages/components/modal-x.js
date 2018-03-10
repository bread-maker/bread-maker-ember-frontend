import {
  collection,
  hasClass,
} from 'ember-cli-page-object'

import c from './_component'



export default c('.modalX', {
  resetScope    : true,
  testContainer : 'body',

  hasButtons : hasClass('-hasButtons'),

  buttons : collection({
    scope     : '.modalX-buttons',
    itemScope : '.modalX-button',
    item      : c(),
  }),
})



export const backdrop =  c('.modalX-backdrop', {
  resetScope    : true,
  testContainer : 'body',

  clickable : hasClass('-clickable'),
})
