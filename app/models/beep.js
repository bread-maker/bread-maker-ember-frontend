// ----- Ember Data modules -----
import attr from 'ember-data/attr'

// ----- Ember addon modules -----
import Fragment from 'ember-data-model-fragments/fragment'
// import computed from 'ember-macro-helpers/computed'



export default Fragment.extend({
  time  : attr('number'),
  count : attr('number'),
})
