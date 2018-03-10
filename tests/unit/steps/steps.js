import yadda from '../../helpers/yadda'

export default function (assert) {
  return yadda.localisation.English.library()
    .given('I type "Ember g feature make-feature"', function (next) {
      assert.ok(true, this.step)
      next()
    })
    .when('I look in the folder', function (next) {
      assert.ok(true, this.step)
      next()
    })
}
