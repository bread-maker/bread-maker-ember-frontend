import { module, test } from 'qunit'
import { visit, currentURL, pauseTest } from '@ember/test-helpers'
import { setupApplicationTest } from 'ember-qunit'
import page from '../pages/login'
import { currentSession } from 'ember-simple-auth/test-support'
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage'
import { get } from '@ember/object'

let m

module('Acceptance | login2', function (hooks) {
  setupApplicationTest(hooks)
  setupMirage(hooks)

  test('should redirect to login from settings when not authenticated', async function (assert) {
    await visit('/login')

    const password = 'foo'

    server.create('password', {value : password})

    await page.visit()
    await page.passwordField.fill(password)
    await page.submitButton.click()

    m = 'current URL'
    assert.equal(currentURL(), '/', m)

    m = 'Token existence in DB'
    assert.ok(server.db.tokens.length > 0, m)

    const session = currentSession(this.owner.application)
    const token = get(session, 'session.content.authenticated.token')

    m = 'Current token in session'
    assert.equal(token, server.db.tokens[0].value, m)

    // debugger // eslint-disable-line no-debugger
    // await pauseTest()
  })
})
