// ----- Ember modules -----
import Route from '@ember/routing/route'
// import { inject as service } from '@ember/service'

// ----- Ember addons -----
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

// ----- Third-party libraries -----
// import RSVP from 'rsvp'

// ----- Own modules -----



export default Route.extend(AuthenticatedRouteMixin, {

  // ----- Services -----



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----



  // ----- Overridden Methods -----
  // model () {
  //   const parentModel = this.modelFor('application')
  //
  //   return RSVP.hash({
  //     ...parentModel,
  //   })
  // },



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  // actions: {
  // }
})
