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

    console.log(page)
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
    expect(page.stages.items().count, m).equal(program.stages.length)

    // Stages
    await RSVP.all(program.stages.map(async (stage, i) => {
      const pageStage = page.stages.items(i).content

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
      expect(pageStage.duration.value, m).equal(`${Math.round((stage.duration || 0) / 60)}`)

      await pageStage.beepsToggle.click()

      const beeps = program.beeps.filterBy('stage', i)

      m = `stage #${i} beeps count`
      expect(pageStage.beeps.items().count, m).equal(beeps.length)

      beeps.forEach((beep, k) => {
        m = `stage #${i} beep #${k} index`
        expect(pageStage.beeps.items(k).index.text, m).equal(`${k + 1}`)

        m = `stage #${i} beep #${k} time`
        expect(pageStage.beeps.items(k).time.value, m).equal(`${Math.round((beep.time || 0) / 60)}`)

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

    m = "Save button disabled stage"
    expect(page.buttons.save.disabled, m).true

    m = "Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).true
  })



  it('editing stage name + saving', async function () {
    programsScenario(server)

    await page.visit({id : '1-1'})
    await page.stages.items(0).content.name.fill('foo')

    m = "#0 After filling name: Save button disabled stage"
    expect(page.buttons.save.disabled, m).false

    m = "#0 After filling name: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).false

    await page.buttons.save.click()

    m = "#1 After saving: Save button disabled stage"
    expect(page.buttons.save.disabled, m).true

    m = "#1 After saving: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).true

    m = "#1 After saving: db stage_name"
    expect(server.db.programs[0].stages[0].stage_name, m).equal('foo')
  })



  it('editing stage temp', async function () {
    programsScenario(server)

    await page.visit({id : '1-1'})
    await page.stages.items(0).content.temp.fill('23')

    m = "#0 After filling temp: Save button disabled stage"
    expect(page.buttons.save.disabled, m).false

    m = "#0 After filling temp: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).false

    await page.buttons.save.click()

    m = "#1 After saving: Save button disabled stage"
    expect(page.buttons.save.disabled, m).true

    m = "#1 After saving: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).true

    m = "#1 After saving: db temp"
    expect(server.db.programs[0].stages[0].temp, m).equal(23)
  })



  it('editing stage motor', async function () {
    programsScenario(server)

    await page.visit({id : '1-1'})
    await page.stages.items(0).content.motor.fill('off')

    m = "#0 After filling motor: Save button disabled stage"
    expect(page.buttons.save.disabled, m).false

    m = "#0 After filling motor: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).false

    await page.buttons.save.click()

    m = "#1 After saving: Save button disabled stage"
    expect(page.buttons.save.disabled, m).true

    m = "#1 After saving: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).true

    m = "#1 After saving: db motor"
    expect(server.db.programs[0].stages[0].motor, m).equal('off')
  })



  it('editing stage duration', async function () {
    programsScenario(server)

    await page.visit({id : '1-1'})
    await page.stages.items(0).content.duration.fill('23')

    m = "#0 After filling duration: Save button disabled stage"
    expect(page.buttons.save.disabled, m).false

    m = "#0 After filling duration: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).false

    await page.buttons.save.click()

    m = "#1 After saving: Save button disabled stage"
    expect(page.buttons.save.disabled, m).true

    m = "#1 After saving: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).true

    m = "#1 After saving: db duration"
    expect(server.db.programs[0].stages[0].duration, m).equal(23 * 60)
  })



  it('editing stage beep time', async function () {
    programsScenario(server)

    await page.visit({id : '1-1'})
    await page.stages.items(3).content.beepsToggle.click()
    await page.stages.items(3).content.beeps.items(0).time.fill(23)

    m = "#0 After filling beep time: Save button disabled stage"
    expect(page.buttons.save.disabled, m).false

    m = "#0 After filling beep time: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).false

    await page.buttons.save.click()

    m = "#1 After saving: Save button disabled stage"
    expect(page.buttons.save.disabled, m).true

    m = "#1 After saving: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).true

    m = "#1 After saving: db beep time"
    expect(server.db.programs[0].beeps[0].time, m).equal(23 * 60)
  })



  it('editing stage beep count', async function () {
    programsScenario(server)

    await page.visit({id : '1-1'})
    await page.stages.items(3).content.beepsToggle.click()
    await page.stages.items(3).content.beeps.items(0).count.fill(23)

    m = "#0 After filling beep count: Save button disabled stage"
    expect(page.buttons.save.disabled, m).false

    m = "#0 After filling beep count: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).false

    await page.buttons.save.click()

    m = "#1 After saving: Save button disabled stage"
    expect(page.buttons.save.disabled, m).true

    m = "#1 After saving: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).true

    m = "#1 After saving: db beep count"
    expect(server.db.programs[0].beeps[0].count, m).equal(23)
  })



  it('adding a beep', async function () {
    programsScenario(server)

    await page.visit({id : '1-1'})
    await page.stages.items(3).content.beepsToggle.click()
    await page.stages.items(3).content.beeps.add.click()

    m = "#0 After adding beep: beeps count"
    expect(page.stages.items(3).content.beeps.items().count, m).equal(2)

    m = "#0 After adding beep: Save button disabled stage"
    expect(page.buttons.save.disabled, m).false

    m = "#0 After adding beep: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).false

    await page.stages.items(3).content.beeps.items(1).time.fill(23)
    await page.stages.items(3).content.beeps.items(1).count.fill(32)
    await page.buttons.save.click()

    m = "#1 After saving: Save button disabled stage"
    expect(page.buttons.save.disabled, m).true

    m = "#1 After saving: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).true

    m = "#1 After saving: db beeps count"
    expect(server.db.programs[0].beeps.length, m).equal(2)

    m = "#1 After saving: db beep 1 time"
    expect(server.db.programs[0].beeps[1].time, m).equal(23 * 60)

    m = "#1 After saving: db beep 1 count"
    expect(server.db.programs[0].beeps[1].count, m).equal(32)
  })



  it('removing a beep', async function () {
    programsScenario(server)

    await page.visit({id : '1-1'})
    await page.stages.items(3).content.beepsToggle.click()
    await page.stages.items(3).content.beeps.items(0).remove.click()

    m = "#0 After removing beep: beeps count"
    expect(page.stages.items(3).content.beeps.items().count, m).equal(0)

    m = "#0 After adding beep: Save button disabled stage"
    expect(page.buttons.save.disabled, m).false

    m = "#0 After adding beep: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).false

    await page.buttons.save.click()

    m = "#1 After saving: Save button disabled stage"
    expect(page.buttons.save.disabled, m).true

    m = "#1 After saving: Reset button disabled stage"
    expect(page.buttons.reset.disabled, m).true

    m = "#1 After saving: db beeps count"
    expect(server.db.programs[0].beeps.length, m).equal(0)
  })


  it('sorting stages', async function () {
    programsScenario(server)

    await page.visit({id : '1-1'})
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
