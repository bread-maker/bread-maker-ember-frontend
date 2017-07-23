import get from 'ember-metal/get'
import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from 'bread-maker-ember-frontend/tests/helpers/start-app'
import destroyApp from 'bread-maker-ember-frontend/tests/helpers/destroy-app'
import { authenticateSession, currentSession } from 'bread-maker-ember-frontend/tests/helpers/ember-simple-auth'
import page from '../pages/login'
import ignoreError from '../helpers/ignore-error'
import {isUnauthorizedError} from 'ember-ajax/errors'



let application, m



function currentToken () {
  return get(currentSession(application), 'session.content.authenticated.token')
}



describe('Acceptance | login', function () {

  beforeEach(function () {
    application = startApp()
  })

  afterEach(function () {
    destroyApp(application)
  })



  it('should redirect to login from settings when not authenticated', async function () {
    await visit('/settings')

    m = 'Current URL'
    expect(currentURL(), m).equal('/login')
  })



  it('should not redirect to login from settings when authenticated', async function () {
    authenticateSession(application)
    await visit('/settings')

    m = 'Current URL'
    expect(currentURL(), m).equal('/settings')
  })



  it('should stay on login when not authenticated', async function () {
    await page.visit()

    m = 'Current URL'
    expect(currentURL(), m).equal('/login')
  })



  it('should authenticate with valid password and redirect to index', async function () {
    const password = 'foo'

    server.create('password', {value : password})

    await page.visit()
    await page.passwordField.fill(password)
    await page.submitButton.click()

    m = 'current URL'
    expect(currentURL(), m).equal('/')

    m = 'Token existence in DB'
    expect(server.db.tokens.length > 0, m).true

    m = 'Current token in session'
    expect(currentToken(), m).equal(server.db.tokens[0].value)
  })



  it('should display an error when authenticating with an invalid password', async function () {
    server.create('password', {value : 'foo'})

    await ignoreError(
      async () => {
        await page.visit()
        await page.passwordField.fill('bar')
        await page.submitButton.click()

        m = 'current URL'
        expect(currentURL(), m).equal('/login')

        m = 'Error text'
        expect(page.error.text, m).equal('Invalid password')
      },
      exception => isUnauthorizedError(exception)
    )
  })
})