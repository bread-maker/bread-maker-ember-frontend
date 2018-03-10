import settingsField from './settings-field'
import { collection, findElementWithAssert } from 'ember-cli-page-object'
import c from './_component'
import { nativeMouseDown, nativeMouseUp } from 'bread-maker-ember-frontend/tests/helpers/ember-power-select'
import wait from 'ember-test-helpers/wait'
import $ from 'jquery'



export default c('.settingsFieldInputButton', {
  ...settingsField,

  selectedItem : c(".ember-power-select-selected-item"),
  searchInput  : c('.ember-power-select-search-input', {resetScope : true}),

  options : collection({
    scope      : '.ember-power-select-options',
    resetScope : true,
    itemScope  : '.ember-power-select-option',
    item       : c(),
  }),

  openPicker () {
    const element = findElementWithAssert(this, '.ember-power-select-trigger').get(0)
    nativeMouseDown(element)
  },

  pickOption (text) {
    const element =
      $(`.ember-power-select-option:contains("${text}")`).get(0)

    console.log(element)

    nativeMouseUp(element)

    return wait()
  },

  async pick (text) {
    await this.openPicker()
    await this.pickOption(text)
    return wait()
  },
})
