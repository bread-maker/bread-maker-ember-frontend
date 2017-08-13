// ----- Ember modules -----
import {assert} from 'ember-metal/utils'

// ----- Ember addons -----
// import {attr} from 'ember-zen'
import PromiseNode from 'ember-zen/nodes/promise'
// import computed from 'ember-macro-helpers/computed'
import writable from 'ember-macro-helpers/writable'
import not from 'ember-awesome-macros/not'

// ----- Own modules -----



export default PromiseNode.extend({

  // ----- Attributes -----



  // ----- Computed properties -----
  token           : writable('content.token'),
  isAuthenticated : not(not('token')),



  actions : {
    authenticate (content) {
      assert(
        'Cannot authenticate session while session request is pending',
        !this.get('isPending')
      )

      this.setAttrs({
        isFulfilled : true,
        isRejected  : false,
        isPending   : false,
        content,
      })
    },

    invalidate () {
      assert(
        'Cannot invalidate session while session request is pending',
        !this.get('isPending')
      )

      this.setAttrs({
        isFulfilled : false,
        isRejected  : false,
        isPending   : false,
        content     : null,
        reason      : null,
      })
    },
  },
})
