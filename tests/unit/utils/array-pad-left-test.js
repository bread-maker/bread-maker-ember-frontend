import { expect } from 'chai'
import { describe, it } from 'mocha'
import arrayPadLeft from 'bread-maker-ember-frontend/utils/array-pad-left'
import _ from 'lodash'



const testCases = [
  /* eslint-disable key-spacing */
  {array: [1, 2, 3], amount: 5, filler: undefined,  expected: [undefined, undefined, 1, 2, 3]},
  {array: [1, 2, 3], amount: 5, filler: null,       expected: [null, null, 1, 2, 3]},
  {array: [1, 2, 3], amount: 5, filler: 'a',        expected: ['a', 'a', 1, 2, 3]},
  {array: [1, 2],    amount: 5, filler: i => i * 2, expected: [0, 2, 4, 1, 2]},
  {array: [1, 2, 3], amount: 2, filler: 'a',        expected: [1, 2, 3]},
  /* eslint-enable key-spacing */
]



describe('Unit | Utility | array pad left', function () {

  testCases.forEach(({array, amount, filler, expected}) => {
    it(`array: ${array}, amount: ${amount}, filler: ${filler}`, function () {
      let result = arrayPadLeft(array, amount, filler)
      expect(result).eql(expected)
    })
  })
})



describe('Unit | Utility | array pad left (lodash)', function () {
  testCases.forEach(({array, amount, filler, expected}) => {
    it(`array: ${array}, amount: ${amount}, filler: ${filler}`, function () {
      let result = _.arrayPadLeft(array, amount, filler)
      expect(result).eql(expected)
    })
  })
})
