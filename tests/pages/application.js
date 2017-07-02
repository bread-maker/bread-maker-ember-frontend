import {
  create,
  visitable
} from 'ember-cli-page-object'

// import c from './components/_component'

import stats from './components/stats-x'



export default create({
  visit : visitable('/'),

  stats
})
