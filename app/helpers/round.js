// ----- Ember modules -----
import { helper } from '@ember/component/helper'

// ----- Third-party libraries -----
import _ from 'lodash'



export function round ([input, precision = 0]/*, hash*/) {
  return input === undefined
    ? ""
    : _.round(input, precision)
}

export default helper(round)
