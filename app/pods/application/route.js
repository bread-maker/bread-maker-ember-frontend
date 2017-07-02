// ----- Ember modules -----
import Route from 'ember-route'
// import service from 'ember-service/inject'

// ----- Third-party modules -----
import RSVP from 'rsvp'



export default Route.extend({

  // ----- Services -----



  // ----- Overridden methods -----
  beforeModel () {
    this.get('zen').logStateChangeOnNode('state', '@@INIT')
  },



  model () {
    const zen = this.get('zen')

    return RSVP.hash({
      stats : zen.get('state.stats').request()
    })
  }
})
