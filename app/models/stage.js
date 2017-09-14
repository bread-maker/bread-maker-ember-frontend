// ----- Ember Data modules -----
import attr from 'ember-data/attr'

// ----- Ember addon modules -----
import Fragment from 'ember-data-model-fragments/fragment'
import {fragmentArray} from 'ember-data-model-fragments/attributes'



export default Fragment.extend({
  stageName : attr('string'),
  motor     : attr('string'),
  temp      : attr('string'),
  duration  : attr('string'),

  beeps : fragmentArray('beep', {defaultValue : []}),
})
