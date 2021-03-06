// ----- Ember modules -----
import EObject from '@ember/object'
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin'

// ----- Ember addons -----
import curriedComputed from "ember-macro-helpers/curried-computed"
import {and} from 'ember-awesome-macros'



const PromiseProxyObject = EObject.extend(PromiseProxyMixin)

const cp = curriedComputed(function (promise) {
  return PromiseProxyObject.create({ promise })
})



export default key => and(key, cp(key))
