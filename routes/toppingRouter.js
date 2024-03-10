const express =  require('express');
const bodyParser = require('body-parser');

const toppingRouter = express.Router();
toppingRouter.use(bodyParser.json());

const {data} = require('../public/data')

toppingRouter.route('/')
  .get((req,res,next) => {
    // res.end('Will send all topping to you' + data.toppings.type + ', ' + data.toppings.price_extra )
    res.send(data.toppings)
  })
  .post((req,res,next) => {
    res.end('Will add the topping: ' + req.body.type +'with price_extra: ' + req.body.price_extra)
  });
  toppingRouter.route('/:topppingId')
  .get((req,res,next) => {
    res.end('will send topping : ' + req.params.topppingId)
  })
  .put((req, res, next) => {
    res.statusCode = 200;
    res.end('update toppinged : ' + req.params.topppingId + ' topping type: ' + req.body.type + 'topping price_extra :' + req.body.price_extra);
  })
  .delete((req,res,next) => {
    res.statusCode = 200;
    res.end('deleting topping susscess : ' + req.params.topppingId);
  })

module.exports = toppingRouter;

