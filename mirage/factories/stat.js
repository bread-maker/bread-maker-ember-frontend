import { Factory } from 'ember-cli-mirage'

export default Factory.extend({
  time        : () => Date.now() / 1000,
  state       : 'idle',
  program_num : undefined,
  crust       : undefined,
  stage       : undefined,
  stage_time  : undefined,
  passed      : undefined,
  left        : undefined,
  target_temp : null,
  temp        : 10,
  motor       : 'off',
  pullup      : false,
  // adc         : undefined,
  // res         : undefined,
  // pwm         : undefined,
  heat        : false,
  error_code  : undefined,
})
