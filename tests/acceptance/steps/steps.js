import yadda, { convertTextToValue } from "bread-maker-ember-frontend/tests/helpers/yadda"
import createTokenAndAuthenticateSession from 'bread-maker-ember-frontend/tests/helpers/session'
import { currentURL, pauseTest, visit/* , fillIn *//* , click */ } from '@ember/test-helpers'



const pages = {
  index    : '/',
  login    : '/login',
  settings : '/settings',
}

let m



export default function (assert) {
  return yadda.localisation.English.library()


    .given("pause", function () {
      return pauseTest()
    })

    .given("debugger", function () {
      debugger // eslint-disable-line no-debugger
    })



    // user is logged in
    // user is Not logged in
    // user is logged in With An Expired Token
    .given("user is (Not )?logged in( With An Expired Token)?", function (isLoggedInRaw, expiredRaw) {
      const isLoggedIn = convertTextToValue(isLoggedInRaw, "is logged in", {
        ""  : true,
        not : false,
      })

      if (!isLoggedIn) return

      const expired = convertTextToValue(isLoggedInRaw, "expired token", {
        ""                      : false,
        "with an expired token" : true,
      })

      return createTokenAndAuthenticateSession(this.server, this.owner, {expired})
    })



    // user visits the Login page
    // user visits the Settings page
    .when("user visits the $page page", function (pageRaw) {
      const page = convertTextToValue(pageRaw, "page", pages)

      return visit(page)
    })



    // current page should be Index
    // current page should be Login
    // current page should be Settings
    .then("current page should be $page", function (pageRaw) {
      const page = convertTextToValue(pageRaw, "page", pages)

      m = `${this.step}: currentURL`
      assert.equal(currentURL(), page, m)
    })
}
