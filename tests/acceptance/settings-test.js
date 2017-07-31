import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from 'bread-maker-ember-frontend/tests/helpers/start-app'
import destroyApp from 'bread-maker-ember-frontend/tests/helpers/destroy-app'
import page from '../pages/settings'
import createTokenAndAuthenticateSession from 'bread-maker-ember-frontend/tests/helpers/session'
// import {timeout} from 'ember-concurrency'
import ignoreError from '../helpers/ignore-error'



describe('Acceptance | settings', function () {
  let application, m



  beforeEach(function () {
    application = startApp()
    createTokenAndAuthenticateSession(server, application)
  })

  afterEach(function () {
    destroyApp(application)
  })



  it('interacting with global config fields', async function () {
    server.create('global-config', {
      max_temp_a    : 50,
      max_temp_b    : 60,
      warm_temp     : 70,
      max_warm_time : 60,
    })

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

    m = 'Server globalConfig'
    expect(_.last(server.db.globalConfigs), m).superset({
      max_temp_a    : 51,
      max_temp_b    : 61,
      warm_temp     : 71,
      max_warm_time : 120,
    })
  })

  it('treating errors', async function () {
    server.logging = true
    server.create('global-config', {
      max_temp_a    : 50,
      max_temp_b    : 60,
      warm_temp     : 70,
      max_warm_time : 60,
    })

    await page.visit()

    server.create('error')

    await ignoreError(
      error => _.get(error, 'status') == 500, // eslint-disable-line eqeqeq
      async () => {
        await page.maxTempBeforeTimer.input.fill('51')
        await page.maxTempBeforeTimer.submit.click()
      }
    )

    m = `Field maxTempBeforeTimer content`
    expect(page.maxTempBeforeTimer.input.value, m).equal('51')

    m = `Field maxTempBeforeBaking content`
    expect(page.maxTempBeforeBaking.input.value, m).equal('60')

    m = `Field maxTempAfterBaking content`
    expect(page.maxTempAfterBaking.input.value, m).equal('70')

    m = `Field maxTempDurationMins content`
    expect(page.maxTempDurationMins.input.value, m).equal('1')

    m = `Field maxTempBeforeTimer status text`
    expect(page.maxTempBeforeTimer.status.text, m)
      .equal('Failed to update globalBakingConfig: Internal exception')

    m = `Field maxTempBeforeBaking status existence`
    expect(page.maxTempBeforeBaking.status.exists, m).false

    m = `Field maxTempAfterBaking status existence`
    expect(page.maxTempAfterBaking.status.exists, m).false

    m = `Field maxTempDurationMins status existence`
    expect(page.maxTempDurationMins.status.exists, m).false
  })



  it('setting locale', async function () {
    server.create('misc-config', {locale : 'en-gb'})

    await page.visit()

    await page.locale.openPicker()

    m = '#0 Initial: Local field label'
    expect(page.locale.label.text, m).equal('Language')

    m = '#0 Initial: Selected item text'
    expect(page.locale.selectedItem.text, m).equal('English (Europe)')

    m = '#0 Initial: Locales count'
    expect(page.locale.options().count, m).equal(3)

    await page.locale.pickOption('Русский')

    m = '#1 After changing locale: Local field label'
    expect(page.locale.label.text, m).equal('Язык')

    m = 'Server miscConfig'
    expect(_.last(server.db.miscConfigs), m).superset({
      locale : 'ru',
    })
  })
})
