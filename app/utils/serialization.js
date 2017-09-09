// ----- Ember modules -----
import { camelize, decamelize } from '@ember/string'

// ----- Third-party modules -----
import _ from 'lodash'



export function camelizeKeys (obj) {
  return _.mapKeys(obj, (value, key) => camelize(key))
}

export function decamelizeKeys (obj) {
  return _.mapKeys(obj, (value, key) => decamelize(key))
}




