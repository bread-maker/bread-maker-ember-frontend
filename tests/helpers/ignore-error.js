import Ember from 'ember'



export default async function ignoreError (errorMaybeCallback, callback) {
  if (arguments.length === 1) {
    callback = errorMaybeCallback
    errorMaybeCallback = true
  }

  // https://github.com/emberjs/ember.js/issues/12791#issuecomment-218561153
  const adapterException = Ember.Test.adapter.exception

  Ember.Test.adapter.exception = exception => {
    if (
      !errorMaybeCallback
      || _.isFunction(errorMaybeCallback) && !errorMaybeCallback(exception)
    ) {
      throw exception
    }
  }

  await callback()

  Ember.Test.adapter.exception = adapterException
}
