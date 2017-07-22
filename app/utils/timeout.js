// ----- Third-party libraries -----
import RSVP from 'rsvp'



export default function timeout (duration = 0) {
  return new RSVP.Promise(resolve => setTimeout(resolve, duration))
}
