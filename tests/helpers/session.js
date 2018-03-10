import wait from 'ember-test-helpers/wait'



export async function authenticateSession (owner, sessionData) {
  const session = owner.lookup('service:session')

  await session.authenticate('authenticator:custom-test', sessionData)
  await wait()
}



export default function createTokenAndAuthenticateSession (server, application, data = {}) {
  const token = server.create('token', data).value
  return authenticateSession(application, {token})
}
