// ----- Ember modules -----
import EObject from '@ember/object'

// ----- Ember addons -----
import curriedComputed from "ember-macro-helpers/curried-computed"
import {and} from 'ember-awesome-macros'

// ----- Old-school imports -----
import Ember from "ember"
const { PromiseProxyMixin } = Ember



const PromiseProxyObject = EObject.extend(PromiseProxyMixin)

const cp = curriedComputed(function (promise) {
  return PromiseProxyObject.create({ promise })
})



export default key => and(key, cp(key))
