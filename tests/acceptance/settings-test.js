import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from 'bread-maker-ember-frontend/tests/helpers/start-app'
import destroyApp from 'bread-maker-ember-frontend/tests/helpers/destroy-app'
import page from '../pages/settings'
import { authenticateSession } from 'bread-maker-ember-frontend/tests/helpers/ember-simple-auth'
// import {timeout} from 'ember-concurrency'



describe('Acceptance | settings', function () {
  let application, m



  beforeEach(function () {
    application = startApp()
  })

  afterEach(function () {
    destroyApp(application)
  })



  it('interacting with fields', async function () {
    server.create('global-config', {
      max_temp_a    : 50,
      max_temp_b    : 60,
      warm_temp     : 70,
      max_warm_time : 60,
    })

    authenticateSession(application)
    await page.visit()

    m = `#0 Initial: Field maxTempBeforeTimer content`
    expect(page.maxTempBeforeTimer.input.value, m).equal('50')

    m = `#0 Initial: Field maxTempBeforeBaking content`
    expect(page.maxTempBeforeBaking.input.value, m).equal('60')

    m = `#0 Initial: Field maxTempAfterBaking content`
    expect(page.maxTempAfterBaking.input.value, m).equal('70')

    m = `#0 Initial: Field maxTempDurationMins content`
    expect(page.maxTempDurationMins.input.value, m).equal('1')

    await page.maxTempBeforeTimer.input.fill('51')
    await page.maxTempBeforeTimer.submit.click()

    await page.maxTempBeforeBaking.input.fill('61')
    await page.maxTempBeforeBaking.submit.click()

    await page.maxTempAfterBaking.input.fill('71')
    await page.maxTempAfterBaking.submit.click()

    await page.maxTempDurationMins.input.fill('2')
    await page.maxTempDurationMins.submit.click()

    m = `#1 After updating fields: Field maxTempBeforeTimer content`
    expect(page.maxTempBeforeTimer.input.value, m).equal('51')

    m = `#1 After updating fields: Field maxTempBeforeBaking content`
    expect(page.maxTempBeforeBaking.input.value, m).equal('61')

    m = `#1 After updating fields: Field maxTempAfterBaking content`
    expect(page.maxTempAfterBaking.input.value, m).equal('71')

    m = `#1 After updating fields: Field maxTempDurationMins content`
    expect(page.maxTempDurationMins.input.value, m).equal('2')

    m = "Server globalConfig"
    expect(_.last(server.db.globalConfigs), m).superset({
      max_temp_a    : 51,
      max_temp_b    : 61,
      warm_temp     : 71,
      max_warm_time : 120,
    })
  })
})
