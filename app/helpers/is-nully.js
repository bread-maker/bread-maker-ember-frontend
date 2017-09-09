// ----- Ember modules -----
import { helper } from '@ember/component/helper'

// ----- Ember addons -----

// ----- Third-party libraries -----

// ----- Own modules -----



export function isNully ([value]/*, hash*/) {
  return value == null
}

export default helper(isNully)
