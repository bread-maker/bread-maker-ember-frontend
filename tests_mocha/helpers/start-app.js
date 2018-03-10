import Application from '../../app'
import config from '../../config/environment'
import { run } from '@ember/runloop'

export default function startApp (attrs) {
  const attributes = {...config.APP, ...attrs}

  return run(() => {
    if (window.server) window.server.shutdown()

    let application = Application.create(attributes)
    application.setupForTesting()
    application.injectTestHelpers()
    return application
  })
}
