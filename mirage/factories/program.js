import { Factory/*, faker*/ } from 'ember-cli-mirage'

export default Factory.extend({
  program_id    : null,
  crust_id      : null,
  program_name  : null,
  max_temp_a    : -1,
  max_temp_b    : -1,
  max_warm_temp : -1,
  max_warm_time : -1,
  stages        : [],
  beeps         : [],
})
