// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(
  "https://medical-b7967-default-rtdb.firebaseio.com/"
);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
console.log(`Express is working on port ${port}`);

server.use(middlewares);
server.use(router);
server.listen(port);
