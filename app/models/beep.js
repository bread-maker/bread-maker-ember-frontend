// ----- Ember Data modules -----
import attr from 'ember-data/attr'

// ----- Ember addon modules -----
import Fragment from 'ember-data-model-fragments/fragment'



export default Fragment.extend({
  stage : attr('number'),
  time  : attr('number'),
  count : attr('number'),
})
