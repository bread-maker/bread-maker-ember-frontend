// Ember modules
import EObject from "ember-object"

// Ember addons
import curriedComputed from "ember-macro-helpers/curried-computed"

// ----- Old-school imports -----
import Ember from "ember"
const { PromiseProxyMixin } = Ember



const PromiseProxyObject = EObject.extend(PromiseProxyMixin)



export default curriedComputed(function (promise) {
  return PromiseProxyObject.create({ promise })
})
