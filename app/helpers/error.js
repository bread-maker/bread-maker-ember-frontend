// ----- Ember modules -----
import Helper from '@ember/component/helper'
import { inject as service } from '@ember/service'

// ----- Ember addons -----

// ----- Third-party libraries -----
import _ from 'lodash'

// ----- Own modules -----




export default Helper.extend({
  intl : service(),

  compute ([errObject]/*, hash*/) {
    const intl = this.get('intl')
    const errorCode = _.get(errObject, 'payload.errorCode')

    return (
      errorCode && intl.t(`errors.${errorCode}`)
      || _.get(errObject, 'payload.errorText')
      || _.get(errObject, 'message')
      || errObject
    )
  },
})
