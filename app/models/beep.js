// ----- Ember Data modules -----
import attr from 'ember-data/attr'

// ----- Ember addon modules -----
import Fragment from 'ember-data-model-fragments/fragment'

// ----- Own modules -----
import minutes from 'bread-maker-ember-frontend/macros/minutes'



export default Fragment.extend({

  // ----- Attrs -----
  time  : attr('number'),
  count : attr('number'),



  // ----- Computed properties -----
  timeMins : minutes('time'),
})
