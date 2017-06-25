import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from 'bread-maker-ember-frontend/tests/helpers/start-app'
import destroyApp from 'bread-maker-ember-frontend/tests/helpers/destroy-app'
import page from '../pages/dummy-stats'



describe('Acceptance | dummy stats', function () {
  let application, m

  beforeEach(function () {
    application = startApp()
  })

  afterEach(function () {
    destroyApp(application)
  })

  it('can visit /dummy-stats', async function () {
    await page.visit()

    m = "Current URL"
    expect(currentURL(), m).to.equal('/dummy-stats')

    ;[
      "time",
      "state",
      "targetTemp",
      "temp",
      "motor",
      "pullup",
      "adc",
      "res",
      "pwm",
      "heat",
    ].forEach(key => {
      m = `${key} content length`
      expect(page.dummyStats.lastStatus[key].text.length, m).gt(0)
    })
  })
})
