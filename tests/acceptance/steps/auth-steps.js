import { convertTextToValue } from "bread-maker-ember-frontend/tests/helpers/yadda"
import steps from './steps'
import page from 'bread-maker-ember-frontend/tests/pages/login'
import wait from "ember-test-helpers/wait"

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file



let m



export default function (assert) {
  return steps(assert)



    // password is `breadtime`
    .given("password is `$password`", function (value) {
      this.server.create('password', {value})
    })



    // user types `breadtime` into the password field
    // user types `invalid_password` into the password field
    .when("user types `$password` into the password field", function (password) {
      return page.passwordField.fill(password)
    })



    .when("user submits the login form", async function () {
      await page.submitButton.click()
      await wait()
    })



    // user should be authenticated
    // user should Not be authenticated
    // user should be authenticated With A Token
    .then("user should (Not )?be authenticated( With A Token)?", function (shouldBeAuthenticatedRaw, shouldCheckTokenRaw) {
      const shouldBeAuthenticated = convertTextToValue(shouldBeAuthenticatedRaw, "is authenticated", {
        ""  : true,
        not : false,
      })

      const shouldCheckToken = convertTextToValue(shouldCheckTokenRaw, "with a token", {
        ""             : false,
        "with a token" : true,
      })

      const session         = this.owner.lookup('service:session')
      const isAuthenticated = session.get('isAuthenticated')

      m = `${this.step}: isAuthenticated`
      assert.equal(isAuthenticated, shouldBeAuthenticated, m)

      if (shouldCheckToken) {
        const currentToken = session.session.content.authenticated.token

        m = `${this.step}: authentication token matches one from Mirage db`
        assert.equal(currentToken, server.db.tokens.lastObject.value, m)
      }
    })
}
