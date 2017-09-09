// ----- Ember modules -----
import { helper } from '@ember/component/helper'



export function trigger ([action]/*, hash*/) {
  action()
}

export default helper(trigger)
