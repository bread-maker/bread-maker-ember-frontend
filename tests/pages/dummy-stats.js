import {
  create,
  visitable
} from 'ember-cli-page-object'

import c from './_helpers/component'



export default create({
  visit : visitable('/'),

  dummyStats : c('.route-dummyStats', {
    lastProgram : c('.route-dummyStats-lastProgram'),
    stats       : c('.route-dummyStats-stats'),
    lastStatus  : c('.route-dummyStats-lastStatus', {
      time       : c('.route-dummyStats-lastStatus-time'),
      state      : c('.route-dummyStats-lastStatus-state'),
      targetTemp : c('.route-dummyStats-lastStatus-targetTemp'),
      temp       : c('.route-dummyStats-lastStatus-temp'),
      motor      : c('.route-dummyStats-lastStatus-motor'),
      pullup     : c('.route-dummyStats-lastStatus-pullup'),
      adc        : c('.route-dummyStats-lastStatus-adc'),
      res        : c('.route-dummyStats-lastStatus-res'),
      pwm        : c('.route-dummyStats-lastStatus-pwm'),
      heat       : c('.route-dummyStats-lastStatus-heat'),
    }),
  })
})
