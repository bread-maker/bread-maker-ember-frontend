import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from 'bread-maker-ember-frontend/tests/helpers/start-app'
import destroyApp from 'bread-maker-ember-frontend/tests/helpers/destroy-app'
import page from '../pages/application'
import PROGRAMS from '../fixtures/programs'



describe('Acceptance | application', function () {
  let application, ajax, session, m

  beforeEach(function () {
    application = startApp()
    ajax = application.__container__.lookup('service:ajax')
    session = application.__container__.lookup('service:session')
  })

  afterEach(function () {
    destroyApp(application)
  })

  it('should display stats', async function () {
    await ajax._setAutorun(false, {forceauth : true})
    await ajax._setEmuTemp(30,    {forceauth : true})

    await page.visit()

    m = "State"
    expect(page.stats.state.text, m).equal("idle")

    m = "targetTemp"
    expect(page.stats.targetTemp.text, m).equal("0°C")

    m = "temp"
    expect(page.stats.temp.text, m).equal("30°C")

    m = "motor"
    expect(page.stats.motor.text, m).equal("off")

    m = "heat"
    expect(page.stats.heat.text, m).equal("false")
  })
})