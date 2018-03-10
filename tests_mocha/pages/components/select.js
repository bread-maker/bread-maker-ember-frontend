import { collection } from 'ember-cli-page-object'
import c from './_component'



export default c('select', {
  options : collection({
    itemScope : 'option',
    item      : c(),
  }),
})
