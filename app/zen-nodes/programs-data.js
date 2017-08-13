// ----- Ember modules -----
import service from 'ember-service/inject'
// import {assert} from 'ember-metal/utils'

// ----- Ember addons -----
import {attr} from 'ember-zen'
import PromiseNode from 'ember-zen/nodes/promise'
// import computed from 'ember-macro-helpers/computed'
// import writable from 'ember-macro-helpers/writable'
// import not from 'ember-awesome-macros/not'

// ----- Own modules -----



export default PromiseNode.extend({

  // ----- Attributes -----
  attrs : {
    items : attr('node-array'),
  },



  // ----- Services -----
  ajax : service(),



  // ----- Static properties -----



  actions : {
    requestAll () {
      const ajax = this.get('ajax')

      this
        .dispatchAction('run', () => ajax.getPrograms())
        .then(programs => {
          this.dispatch('update programs', () => {
            const items     = this.get('items')
            const itemsById = _.keyBy(items.toArray(), 'id')

            // Remove obsolete items
            items
              .filter(id => !itemsById[id])
              .forEach(item => {
                items.removeObject(item)
                delete itemsById[item.get('id')]
              })

            // Add new & update existing items
            programs.forEach(program => {
              const {id} = program

              if (itemsById[id]) {
                itemsById[id].populate(program)
              } else {
                const node = this.createChildNode({
                  nodeName : 'program',
                  nodeType : 'program',
                  payload  : program,
                })
                itemsById[id] = node

                items.addObject(node)
              }
            })
          })
        })
    },
  },
})
