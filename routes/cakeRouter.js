const express =  require('express');
const bodyParser = require('body-parser');

const cakeRouter = express.Router();
cakeRouter.use(bodyParser.json());
const {data} = require('../public/data')
cakeRouter.route('/')
  .get((req,res,next) => {
    // res.end('Will send all cakes to you')
    res.send(data.cakes)
  })
  .post((req,res,next) => {
    res.end('Will add the cake type: ' + req.body.type +'with name: ' + req.body.name + 'with price ' + req.body.price)
  });
  cakeRouter.route('/:cakeId')
  .get((req,res,next) => {
    res.end('will send cake : ' + req.params.cakeId)
  })
  .put((req, res, next) => {
    res.statusCode = 200;
    res.end('update cakeed : ' + req.body.type +'with name: ' + req.body.name + 'with price ' + req.body.price);
  })
  .delete((req,res,next) => {
    res.statusCode = 200;
    res.end('deleting cake susscess : ' + req.params.cakeId);
  })

module.exports = cakeRouter;

