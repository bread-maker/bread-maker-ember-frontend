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
import createTokenAndAuthenticateSession from 'bread-maker-ember-frontend/tests/helpers/session'
import programsScenario from 'bread-maker-ember-frontend/mirage/scenarios/programs'



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



  it('failure after fetching stats', async function () {
    server.create('stat', {temp : 30})

    await page.visit()

    server.create('error')

    await ignoreError(
      error => _.get(error, 'status') == 500, // eslint-disable-line eqeqeq
      async () => {
        pollTaskFor(REQUEST_STATS_POLL_ID)
        await timeout(0)
      }
    )

    m = "Error message"
    expect(page.statsError.message.text, m).equal("Failed to fetch stats: Internal exception")

    m = "Error time"
    expect(page.statsError.time.text, m).equal("Showing data from a few seconds ago")
  })



  it('unauthenticated user should not see start baking button', async function () {
    server.create('stat', {temp : 30})

    await page.visit()

    m = "Start button visibility"
    expect(page.start.visible, m).false
  })



  it('starting baking and cancelling', async function () {
    server.create('stat', {temp : 30})
    programsScenario(server)
    createTokenAndAuthenticateSession(server, application)

    await page.visit()

    m = "#0 Initial: Start button visibility"
    expect(page.start.visible, m).true

    m = "#0 Initial: Start modal visibility"
    expect(page.startModal.visible, m).false

    await page.start.click()

    m = "#1 After clicking start: Start modal visibility"
    expect(page.startModalBackdrop.visible, m).true

    m = "#1 After clicking start: Start modal visibility"
    expect(page.startModal.visible, m).true

    await page.startModalBackdrop.click()

    m = "#2 After clicking backdrop: Start modal visibility"
    expect(page.startModalBackdrop.visible, m).false

    m = "#2 After clicking backdrop: Start modal visibility"
    expect(page.startModal.visible, m).false
  })



  it('starting baking normally', async function () {
    server.create('stat', {temp : 30})
    programsScenario(server)
    createTokenAndAuthenticateSession(server, application)

    await page.visit()

    m = "#0 Initial: Start button visibility"
    expect(page.start.visible, m).true

    m = "#0 Initial: Start modal visibility"
    expect(page.startModal.visible, m).false

    await page.start.click()

    m = "#1 After clicking start: Start modal visibility"
    expect(page.startModalBackdrop.visible, m).true

    m = "#1 After clicking start: Start modal visibility"
    expect(page.startModal.visible, m).true

    m = "#2 After clicking start: message"
    expect(page.startModal.message.text, m).equal("Choose a program to start")

    m = "#2 After clicking start: programs count"
    expect(page.startModal.programs.options().count, m).equal(21)

    await page.startModal.programs.fill('2-2')
    await page.startModal.buttons(0).click()

    m = "#3 After clicking Ok in the modal: confirmation dialog message"
    expect(page.dialog.message.text, m).equal("About to start baking program 3-3 Specialty Bread (dark). Ensure ingredients are in place and press OK.")

    await page.dialog.buttonOk.click()

    server.create('stat', {state : 'baking'})
    pollTaskFor(REQUEST_STATS_POLL_ID)
    await timeout(0)

    m = "#4 After confirming: confirmation dialog existence"
    expect(page.dialog.exists, m).false

    m = "#4 After confirming: modal existence"
    expect(page.startModal.exists, m).false

    m = "#4 After confirming: state"
    expect(page.stats.state.text, m).equal('baking')
  })



  it('starting baking error', async function () {
    server.create('stat', {temp : 30})
    programsScenario(server)
    createTokenAndAuthenticateSession(server, application)

    await page.visit()
    await page.start.click()
    await page.startModal.programs.fill('2-2')
    await page.startModal.buttons(0).click()

    server.create('error')

    await ignoreError(
      error => _.get(error, 'status') == 500, // eslint-disable-line eqeqeq
      async () => {
        await page.dialog.buttonOk.click()
      }
    )

    m = "confirmation dialog message"
    expect(page.dialog.message.text, m).equal("Failed to start baking: Internal exception")
  })



  it('clear error', async function () {
    server.create('stat', {state : 'error', error_code : 22})
    programsScenario(server)
    createTokenAndAuthenticateSession(server, application)

    await page.visit()

    m = "#0 Initial: status text"
    expect(page.stats.state.text, m).equal("error")

    m = "#0 Initial: error text"
    expect(page.stats.error.text, m).equal("Internal exception")

    await page.stats.clear.click()

    server.create('stat')
    pollTaskFor(REQUEST_STATS_POLL_ID)
    await timeout(0)

    m = "#1 After clearing: status text"
    expect(page.stats.state.text, m).equal("idle")

    m = "#1 After clearing: error visibility"
    expect(page.stats.error.visible, m).false
  })
})
