// ----- Ember Data modules -----
import attr from 'ember-data/attr'

// ----- Ember addon modules -----
import Fragment from 'ember-data-model-fragments/fragment'
import {fragmentArray} from 'ember-data-model-fragments/attributes'
// import computed from 'ember-macro-helpers/computed'

// ----- Own modules -----
import minutes from 'bread-maker-ember-frontend/macros/minutes'



export default Fragment.extend({
  // ----- Attrs -----
  stageName : attr('string'),
  motor     : attr('string'),
  temp      : attr('number'),
  duration  : attr('number'),



  // ----- Fragments -----
  beeps : fragmentArray('beep', {defaultValue : []}),



  // ----- Computed properties -----
  durationMins : minutes('duration'),
})
