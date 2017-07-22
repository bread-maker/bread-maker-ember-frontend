// ----- Ember modules -----
import Route from 'ember-route'

// ----- Ember addons -----
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin'



export default Route.extend(UnauthenticatedRouteMixin, {

  // ----- Services -----



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----



  // ----- Overridden Methods -----
  // model() {
  //   const parentModel = this.modelFor('')
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
