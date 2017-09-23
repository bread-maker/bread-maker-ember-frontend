import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from 'bread-maker-ember-frontend/tests/helpers/start-app'
import destroyApp from 'bread-maker-ember-frontend/tests/helpers/destroy-app'
import page from '../pages/program'
import errorPage from '../pages/error'
import programsScenario from 'bread-maker-ember-frontend/mirage/scenarios/programs'
import createTokenAndAuthenticateSession from 'bread-maker-ember-frontend/tests/helpers/session'
// import ignoreError from '../helpers/ignore-error'
// import _ from 'lodash'
import RSVP from 'rsvp'



describe('Acceptance | program', function () {
  let application, m

  beforeEach(function () {
    application = startApp()
    createTokenAndAuthenticateSession(server, application)
  })

  afterEach(function () {
    destroyApp(application)
  })



  it('should redirect to first program', async function () {
    programsScenario(server)

    await visit('/programs')

    m = 'current URL'
    expect(currentURL(), m).equal('/programs/1-1')
  })



  it('programs list, switching programs', async function () {
    const programs = programsScenario(server)

    await page.visit({id : '0-0'})

    m = 'programs count'
    expect(page.programs().count, m).equal(21)

    programs.forEach((program, i) => {
      const id      = `${program.program_id}-${program.crust_id}`
      const humanId = `${program.program_id + 1}-${program.crust_id + 1}`

      m = `program ${id} human id`
      expect(page.programs(i).id.text, m).equal(humanId)

      m = `program ${id} human name`
      expect(page.programs(i).name.text, m).equal(program.program_name)
    })

    await page.programs(3).link.click()

    m = '#1 after clicking fourth program: URL'
    expect(currentURL(), m).equal('/programs/2-1')

    m = '#1 after clicking fourth program: name'
    expect(page.name.text, m).equal(programs[3].program_name)
  })



  it('error when no programs', async function () {
    await visit('/programs')

    m = "Error message"
    expect(errorPage.message.text, m).equal("No programs have been found. :( This should not happen.")

    m = "Error type"
    expect(errorPage.type.text, m).equal("server")
  })



  it('should render all fields', async function () {
    const programs = programsScenario(server)
    const [program] = programs

    await visit('/programs/1-1')

    m = 'name'
    expect(page.name.text, m).equal(program.program_name)

    m = 'stages count'
    expect(page.stages().count, m).equal(program.stages.length)

    // Stages
    await RSVP.all(program.stages.map(async (stage, i) => {
      const pageStage = page.stages(i)

      m = `stage #${i} index`
      expect(pageStage.index.text, m).equal(`${i + 1}`)

      m = `stage #${i} name`
      expect(pageStage.name.value, m).equal(stage.stage_name)

      m = `stage #${i} temp`
      expect(pageStage.temp.value, m).equal(`${stage.temp}`)

      m = `stage #${i} motor options count`
      expect(pageStage.motor.options().count, m).equal(3)

      m = `stage #${i} motor value`
      expect(pageStage.motor.value, m).equal(stage.motor)

      m = `stage #${i} duration`
      expect(pageStage.duration.value, m).equal(`${stage.duration}`)

      await pageStage.beepsToggle.click()

      const beeps = program.beeps.filterBy('stage', i)

      m = `stage #${i} beeps count`
      expect(pageStage.beeps.items().count, m).equal(beeps.length)

      beeps.forEach((beep, k) => {
        m = `stage #${i} beep #${k} index`
        expect(pageStage.beeps.items(k).index.text, m).equal(`${k + 1}`)

        m = `stage #${i} beep #${k} time`
        expect(pageStage.beeps.items(k).time.value, m).equal(`${beep.time}`)

        m = `stage #${i} beep #${k} count`
        expect(pageStage.beeps.items(k).count.value, m).equal(`${beep.count}`)
      })
    }))

    m = "name setting"
    expect(page.fields.name.input.value, m).equal(`${program.program_name}`)

    m = "maxTempBeforeTimer"
    expect(page.fields.maxTempBeforeTimer.input.value, m).equal(`${program.max_temp_a || ''}`)

    m = "maxTempBeforeBaking"
    expect(page.fields.maxTempBeforeBaking.input.value, m).equal(`${program.max_temp_b || ''}`)

    m = "maxTempAfterBaking"
    expect(page.fields.maxTempAfterBaking.input.value, m).equal(`${program.warm_temp || ''}`)

    m = "maxTempDurationMins"
    expect(page.fields.maxTempDurationMins.input.value, m).equal(`${Math.round((program.max_warm_time || 0) / 60)}`)
  })



  it.skip('editing name', async function () {
  })



  it.skip('editing temp', async function () {
  })



  it.skip('editing motor', async function () {
  })



  it.skip('editing time', async function () {
  })



  it.skip('editing a beep', async function () {
  })



  it.skip('adding a beep', async function () {
  })



  it.skip('removing a beep', async function () {
  })



  it.skip('sorting beeps', async function () {
  })



  it.skip('sorting stages', async function () {
  })



  it.skip('removing a stage', async function () {
  })



  it.skip('no stages', async function () {
  })



  it.skip('adding a stage', async function () {
  })



  it.skip('editing settings - name', async function () {
  })



  it.skip('editing settings - max temp a', async function () {
  })



  it.skip('editing settings - max temp b', async function () {
  })



  it.skip('editing settings - warm temp', async function () {
  })



  it.skip('editing settings - max warm time', async function () {
  })



  it.skip('resetting form', async function () {
  })
})
