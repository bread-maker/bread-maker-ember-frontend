import EmberRouter from '@ember/routing/router'
import config from './config/environment'

const Router = EmberRouter.extend({
  location : config.locationType,
  rootURL  : config.rootURL,
})

Router.map(function () {
  this.route('login')
  this.route('programs', function () {
    this.route('program', {path : ':humanId'})
  })
  this.route('settings')
})

export default Router
