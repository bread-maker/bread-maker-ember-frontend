// ----- Ember modules -----
import {alias} from 'ember-computed'
// import { alias } from '@ember/object/computed'

// ----- Ember Data modules -----
import Model from 'ember-data/model'
import attr from 'ember-data/attr'

// ----- Ember addon modules -----
import {fragmentArray} from 'ember-data-model-fragments/attributes'
import computed from 'ember-macro-helpers/computed'
import {add, tag} from 'ember-awesome-macros'




export default Model.extend({

  // ----- Attributes -----
  programId   : attr('number'),
  crustId     : attr('number'),
  programName : attr('string'),

  maxTempBeforeTimer  : attr('number'),
  maxTempBeforeBaking : attr('number'),
  maxTempAfterBaking  : attr('number'),
  maxTempDuration     : attr('number'),

  stages : fragmentArray('stage', {defaultValue : []}),



  // ----- Relationships -----



  // ----- Services -----



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----
  humanId : tag`${add('programId', 1)}-${add('crustId', 1)}`,
  name    : alias('programName'),

  maxTempDurationMins : computed('maxTempDuration', {
    get (maxTempDuration = 0) {
      return Math.round(maxTempDuration / 60)
    },

    set (maxTempDuration) {
      return maxTempDuration * 60
    },
  }),



  // ----- Overridden Methods -----



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----
})
