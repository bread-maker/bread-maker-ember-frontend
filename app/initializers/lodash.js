// ----- Ember modules -----

// ----- Ember addons -----

// ----- Third-party libraries -----

// ----- Own modules -----
import arrayPadLeft from 'bread-maker-ember-frontend/utils/array-pad-left'



export function initialize (/* application */) {
  // application.inject('route', 'foo', 'service:foo')
  _.mixin({arrayPadLeft})
}

export default {
  name : 'lodash',
  initialize,
}
