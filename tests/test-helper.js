import resolver from './helpers/resolver'
import { setResolver } from 'ember-mocha'
import { mocha } from 'mocha'
import Reporter from './helpers/ember-cli-mocha-reporter'
import './helpers/chai-assertions'

setResolver(resolver)
mocha.reporter(Reporter)
mocha.slow(10000)
mocha.timeout(30000)
// mocha.timeout(0)
