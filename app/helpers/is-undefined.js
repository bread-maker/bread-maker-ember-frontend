// ----- Ember modules -----
import {helper} from 'ember-helper'

// ----- Ember addons -----

// ----- Third-party libraries -----

// ----- Own modules -----



export function isUndefined ([value]/*, hash*/) {
  return value === undefined
}

export default helper(isUndefined)
