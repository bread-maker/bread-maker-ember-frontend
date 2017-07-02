import { expect } from 'chai'
import { describe, it, beforeEach, afterEach } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { create } from 'ember-cli-page-object'
import statsX from '../../../../pages/components/stats-x'

const component = create(statsX)
let m



describe('Integration | Component | stats x', function () {
  setupComponentTest('stats-x', {
    integration : true
  })

  beforeEach(function () {
    component.setContext(this)
  })

  afterEach(function () {
    component.removeContext()
  })

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#stats-x}}
    //     template content
    //   {{/stats-x}}
    // `);
    const stats = {
      time       : 1498991088,
      state      : "idle",
      targetTemp : 0,
      temp       : 25.002313404515,
      motor      : "off",
      pullup     : false,
      adc        : 974,
      res        : 99998,
      pwm        : 0,
      heat       : false
    }

    this.setProperties({stats})

    this.render(hbs`{{stats-x stats=stats}}`)

    // m = "time"
    // expect(component.time.text, m).equal("MM-DD-YYYY")

    m = "State"
    expect(component.state.text, m).equal("idle")

    m = "targetTemp"
    expect(component.targetTemp.text, m).equal("0")

    m = "temp"
    expect(component.temp.text, m).equal("25")

    m = "motor"
    expect(component.motor.text, m).equal("off")

    // m = "pullup"
    // expect(component.pullup.text, m).equal("false")
    //
    // m = "adc"
    // expect(component.adc.text, m).equal("974")
    //
    // m = "res"
    // expect(component.res.text, m).equal("99998")
    //
    // m = "pwm"
    // expect(component.pwm.text, m).equal("0")

    m = "heat"
    expect(component.heat.text, m).equal("false")
  })
})
