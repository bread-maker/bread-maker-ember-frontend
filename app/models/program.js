// ----- Ember modules -----
import {alias} from 'ember-computed'
// import { alias } from '@ember/object/computed'

// ----- Ember Data modules -----
import Model from 'ember-data/model'
import attr from 'ember-data/attr'

// ----- Ember addon modules -----
import {add, tag} from 'ember-awesome-macros'



export default Model.extend({

  // ----- Attributes -----
  programId   : attr('number'),
  crustId     : attr('number'),
  programName : attr('string'),

  maxTempBeforeTimer  : attr('number'),
  maxTempBeforeBaking : attr('number'),
  maxTempAfterBaking  : attr('number'),
  maxTempDurationMins : attr('number'),

  stages : attr(),
  beeps  : attr(),



  // ----- Relationships -----



  // ----- Services -----



  // ----- Overridden properties -----



  // ----- Static properties -----



  // ----- Computed properties -----
  humanId : tag`${add('programId', 1)}-${add('crustId', 1)}`,
  name    : alias('programName'),



  // ----- Overridden Methods -----



  // ----- Custom Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----
})
