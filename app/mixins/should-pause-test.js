import Ember from 'ember'
import Mixin from '@ember/object/mixin'
import { registerWaiter, unregisterWaiter } from '@ember/test'



export default Mixin.create({
  shouldPauseTest : false,

  testWaiter () {
    return !this.shouldPauseTest
  },

  init () {
    this._super(...arguments)

    if (Ember.testing) {
      registerWaiter(this, this.testWaiter)
    }
  },

  willDestroy () {
    if (Ember.testing) {
      unregisterWaiter(this, this.testWaiter)
    }
  },
})
