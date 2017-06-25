import Route from 'ember-route'
import service from 'ember-service/inject'



export default Route.extend({

  ajax : service(),

  model () {
    return this
      .get('ajax')
      .getStats()
  }
})
