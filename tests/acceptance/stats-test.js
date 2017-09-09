import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from 'bread-maker-ember-frontend/tests/helpers/start-app'
import destroyApp from 'bread-maker-ember-frontend/tests/helpers/destroy-app'
import page from '../pages/application'
import errorPage from '../pages/error'
import { pollTaskFor } from 'ember-lifeline/mixins/run'
import {REQUEST_STATS_POLL_ID} from 'bread-maker-ember-frontend/constants'
import {timeout} from 'ember-concurrency'
import ignoreError from '../helpers/ignore-error'
import _ from 'lodash'



describe('Acceptance | stats', function () {
  let application, m

  beforeEach(function () {
    application = startApp()
  })

  afterEach(function () {
    destroyApp(application)
  })



  it('should display stats', async function () {
    server.create('stat', {temp : 30})

    await page.visit()

    m = 'State'
    expect(page.stats.state.text, m).equal('idle')

    m = 'targetTemp'
    expect(page.stats.targetTemp.text, m).equal('0°C')

    m = 'temp'
    expect(page.stats.temp.text, m).equal('30°C')

    m = 'motor'
    expect(page.stats.motor.text, m).equal('off')

    m = 'heat'
    expect(page.stats.heat.text, m).equal('off')
  })



  it('polling', async function () {
    server.create('stat', {temp : 30})

    await page.visit()

    m = '#0 Initial: temp'
    expect(page.stats.temp.text, m).equal('30°C')

    server.create('stat', {temp : 20})
    pollTaskFor(REQUEST_STATS_POLL_ID)
    await timeout(0)

    m = '#1 After polling: temp'
    expect(page.stats.temp.text, m).equal('20°C')
  })

  it('global failure', async function () {
    server.create('error')

    await ignoreError(
      error => _.get(error, 'status') == 500, // eslint-disable-line eqeqeq
      async () => {
        await page.visit()
      }
    )

    m = "Error type"
    expect(errorPage.type.text, m).equal("server")

    m = "Error status"
    expect(errorPage.status.text, m).equal("500")
  })
})
