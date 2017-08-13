import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from 'bread-maker-ember-frontend/tests/helpers/start-app'
import destroyApp from 'bread-maker-ember-frontend/tests/helpers/destroy-app'
import page from '../pages/application'
import createTokenAndAuthenticateSession from 'bread-maker-ember-frontend/tests/helpers/session'



describe('Acceptance | main menu', function () {
  let application, m

  beforeEach(function () {
    application = startApp()
  })

  afterEach(function () {
    destroyApp(application)
  })

  it('when unauthenticated', async function () {
    await page.visit()

    m = 'Items count'
    expect(page.menu.items().count, m).equal(2)

    m = 'Chart item visibility'
    expect(page.menu.chart.visible, m).true

    m = 'Login item visibility'
    expect(page.menu.login.visible, m).true
  })

  it('when authenticated', async function () {
    await createTokenAndAuthenticateSession(server, application)
    await page.visit()

    m = 'Items count'
    expect(page.menu.items().count, m).equal(4)

    m = 'Chart item visibility'
    expect(page.menu.chart.visible, m).true

    m = 'Logout item visibility'
    expect(page.menu.logout.visible, m).true

    m = 'Programs item visibility'
    expect(page.menu.programs.visible, m).true

    m = 'Settings item visibility'
    expect(page.menu.settings.visible, m).true
  })
})
