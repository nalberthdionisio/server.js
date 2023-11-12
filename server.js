const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    router.db.write();
  }
  next();
});

server.use(router);

server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running');
});
