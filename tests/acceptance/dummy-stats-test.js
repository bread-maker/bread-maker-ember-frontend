import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from 'bread-maker-ember-frontend/tests/helpers/start-app'
import destroyApp from 'bread-maker-ember-frontend/tests/helpers/destroy-app'



describe('Acceptance | dummy stats', function () {
  let application

  beforeEach(function () {
    application = startApp()
  })

  afterEach(function () {
    destroyApp(application)
  })

  it('can visit /dummy-stats', async function () {
    await visit('/dummy-stats')

    expect(currentURL()).to.equal('/dummy-stats')
  })
})
