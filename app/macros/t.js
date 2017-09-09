// ----- Ember addons -----
import curriedComputed from 'ember-macro-helpers/curried-computed'



export default curriedComputed(function (...args) {
  return this.get('intl').t(...args)
})
