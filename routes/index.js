const express = require('express');
 http = require('http');

 const dishRouter = require('./dishRouter');

 const hostname = 'localhost';
 const port = 3000;

 const app = express();

 app.use('/dishes', dishRouter);

 const server = http.createServer(app);

 server.listen(port , hostname, () => {
  console.log(`Sever runnig at http://${hostname}:${port}/`);
 });