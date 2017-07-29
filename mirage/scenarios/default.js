export default function (server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);
  window.server = server

  server.create('password', {value : 'breadtime'})
  server.create('token', {value : '0ee3adf3-a4ec-4c9f-a2b4-85803071cd54', expired : true})
}
