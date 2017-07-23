import Ember from 'ember'



export default async function (callback, errorCallback) {

  // https://github.com/emberjs/ember.js/issues/12791#issuecomment-218561153
  const adapterException = Ember.Test.adapter.exception
  Ember.Test.adapter.exception = exception => {
    if (errorCallback && !errorCallback(exception)) {
      throw exception
    }
  }

  await callback()

  Ember.Test.adapter.exception = adapterException
}
