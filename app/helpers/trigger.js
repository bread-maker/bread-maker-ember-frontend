import {helper} from 'ember-helper'



export function trigger ([action]/*, hash*/) {
  action()
}

export default helper(trigger)
