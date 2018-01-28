// import { text } from 'ember-cli-page-object'
import c from './_component'



export default c('.statsX', {
  time       : c('.statsX-stat._time       .statsX-stat-value'),
  state      : c('.statsX-stat._state      .statsX-stat-value'),
  targetTemp : c('.statsX-stat._targetTemp .statsX-stat-value'),
  temp       : c('.statsX-stat._temp       .statsX-stat-value'),
  motor      : c('.statsX-stat._motor      .statsX-stat-value'),
  pullup     : c('.statsX-stat._pullup     .statsX-stat-value'),
  adc        : c('.statsX-stat._adc        .statsX-stat-value'),
  res        : c('.statsX-stat._res        .statsX-stat-value'),
  pwm        : c('.statsX-stat._pwm        .statsX-stat-value'),
  heat       : c('.statsX-stat._heat       .statsX-stat-value'),
  error      : c('.statsX-stat._error      .statsX-stat-value'),

  clear : c('.statsX-clear'),
})
