// ----- Ember Data modules -----
import attr from 'ember-data/attr'

// ----- Ember addon modules -----
import Fragment from 'ember-data-model-fragments/fragment'



export default Fragment.extend({
  stageName : attr('string'),
  motor     : attr('string'),
  temp      : attr('string'),
  duration  : attr('string'),
})
