// ----- Ember modules -----
import Component from '@ember/component'
import { inject as service } from '@ember/service'

// ----- Ember addons -----
import raw from 'ember-macro-helpers/raw'
import tag from 'ember-awesome-macros/tag'

// ----- Third-party libraries -----

// ----- Own modules -----
import t from 'bread-maker-ember-frontend/macros/t'



export default Component.extend({

  // ----- Arguments -----
  fieldName         : undefined,
  label             : undefined,
  description       : undefined,
  requestIsPending  : false,
  requestIsRejected : false,
  updatingLabel     : t(raw('routes.settings.updating')),
  errorLabel        : undefined,



  // ----- Services -----
  intl : service(),



  // ----- Overridden properties -----
  classNameBindings : [
    ':settingsField',
    'fieldNameClass',
  ],



  // ----- Properties -----



  // ----- Computed properties -----
  fieldNameClass : tag`_${'fieldName'}`,



  // ----- Overridden Methods -----



  // ----- Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  // actions: {
  // }
})
