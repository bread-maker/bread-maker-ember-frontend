import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import { create } from 'ember-cli-page-object'
import hbs from 'htmlbars-inline-precompile'
import modalX, {backdrop as modalXBackdrop} from 'bread-maker-ember-frontend/tests/pages/components/modal-x'
import wait from 'ember-test-helpers/wait'

const component = create(modalX)
const backdrop   = create(modalXBackdrop)
let m



describe('Integration | Component | modal-x', function () {

  setupComponentTest('modal-x', {
    integration : true,
  })

  beforeEach(function () {
    component.setContext(this)
    backdrop.setContext(this)
  })

  afterEach(function () {
    component.removeContext()
    backdrop.removeContext()
  })



  it('renders', async function () {
    this.render(hbs`{{modal-x}}`)
    await wait()

    m = 'Backdrop visibility'
    expect(backdrop.visible, m).true

    m = 'Backdrop clickable class'
    expect(backdrop.clickable, m).false

    m = 'Modal visibility'
    expect(component.visible, m).true

    m = 'Modal hasButtons class'
    expect(component.hasButtons, m).false
  })



  it('hasButtons', async function () {
    let actionCalled = false

    this.set('myAction', () => actionCalled = true)


    this.render(hbs`{{modal-x
      backdropAction = myAction

      buttons = (array
        (hash
          klass  = '-foo'
          label  = 'OK'
          action = myAction
        )
      )
    }}`)
    await wait()

    m = 'Backdrop clickable class'
    expect(backdrop.clickable, m).true

    m = 'Modal hasButtons class'
    expect(component.hasButtons, m).true

    m = 'Buttons count'
    expect(component.buttons().count, m).equal(1)

    m = 'Button 0 label'
    expect(component.buttons(0).text, m).equal('OK')

    m = 'Button 0 hasClass -foo'
    expect(component.buttons(0).$.hasClass('-foo'), m).true

    component.buttons(0).click()
    await wait()

    m = 'Action called'
    expect(actionCalled, m).true
  })
})
