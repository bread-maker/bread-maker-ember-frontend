// ----- Third-party modules -----
import _ from 'lodash'

// ----- Own modules -----
import programs from '../fixtures/programs'



export default function (server) {

  return _.map(programs, (program, id) => {
    const [program_id, crust_id] = id.split('-').map(n => parseInt(n, 10))

    return server.create('program', {...program, program_id, crust_id})
  })

}
