import wait from 'ember-test-helpers/wait'



export async function authenticateSession (app, sessionData) {
  const { __container__: container } = app
  const session = container.lookup('service:session')

  await session.authenticate('authenticator:custom-test', sessionData)
  await wait()
}



export default function createTokenAndAuthenticateSession (server, application, data = {}) {
  const token = server.create('token', data).value
  return authenticateSession(application, {token})
}

