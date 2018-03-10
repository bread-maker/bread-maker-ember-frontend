import resolver from './helpers/resolver'
import { setResolver } from 'ember-mocha'
import { mocha } from 'mocha'
import Reporter from './helpers/ember-cli-mocha-reporter'
import './helpers/chai-assertions'
import RSVP from 'rsvp'

setResolver(resolver)
mocha.reporter(Reporter)
mocha.slow(10000)
mocha.timeout(30000)
// mocha.timeout(0)

window.pause = function pause (timeout) {
  return new RSVP.Promise(resolve => {
    if (timeout != null) {
      setTimeout(resolve, timeout)
    }
  })
}
