import {helper} from 'ember-helper'



export function round ([input, precision = 0]/*, hash*/) {
  return input === undefined
    ? ""
    : _.round(input, precision)
}

export default helper(round)
