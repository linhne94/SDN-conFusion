const express = require('express')
const cakeRoute = express.Router()

const cakeController = require('../Controller/CakeController')

cakeRoute
  .route("/")
  .get(cakeController.index)
  .get(cakeController.getById)
  .post(cakeController.addCake)
  .delete(cakeController.deleteAll);

  cakeRoute
  .route("/:cakeId")
  .get(cakeController.getById)
  .put(cakeController.updateById)
  .delete(cakeController.deleteById);

module.exports = cakeRoute
