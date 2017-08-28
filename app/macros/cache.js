// ----- Ember addon modules -----
import computed from 'ember-macro-helpers/computed'



export default function (propKey, cachePropKey) {
  if (!cachePropKey) cachePropKey = `${propKey}_cache`

  return computed(propKey, cachePropKey, {
    get (value, cache) {
      if (value == null) {
        return cache
      } else {
        this.set(cachePropKey, value)
        return value
      }
    },
  })
}
