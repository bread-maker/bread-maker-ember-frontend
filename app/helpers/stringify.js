// ----- Ember modules -----
import {helper} from 'ember-helper'

// ----- Ember addons -----

// ----- Third-party libraries -----

// ----- Own modules -----



export function stringify ([obj]/*, hash*/) {
  try {
    return JSON.stringify(obj, null, 2)
  } catch (e) {
    return obj.toString()
  }
}

export default helper(stringify)
