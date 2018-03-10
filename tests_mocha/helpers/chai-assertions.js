import {use, Assertion} from 'chai'
import _ from 'lodash'


export function subset (/*chai , utils */) {
  Assertion.addMethod("subset", function (superset) {
    const subset = this._obj

    const result = _.every(subset, (value, key) => _.get(superset, key) === value)

    this.assert(
      result,
      `expected #{this} to be a subset of #{act}`,
      `expected #{this} not to be a subset of #{act}`,
      this._obj,
      superset
    )
  })
}

use(subset)



export function superset (/*chai , utils */) {
  Assertion.addMethod("superset", function (subset) {
    const superset = this._obj

    const result = _.every(subset, (value, key) => _.get(superset, key) === value)

    this.assert(
      result,
      `expected #{this} to be a superset of #{act}`,
      `expected #{this} not to be a superset of #{act}`,
      this._obj,
      subset
    )
  })
}

use(superset)
