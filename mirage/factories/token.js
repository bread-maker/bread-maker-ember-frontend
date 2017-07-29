import { Factory, faker } from 'ember-cli-mirage'

export default Factory.extend({
  value   : () => faker.random.uuid(),
  expired : false,
})
