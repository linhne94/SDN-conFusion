const express = require('express')

const promoRouter = express.Router();
const proController = require('../Controller/PromotionController')

promoRouter.route('/').get(proController.index)
                      .post(proController.add)
                      .put(proController.update)
                      .delete(proController.deletePro);

promoRouter.route('/:promoId').get(proController.getById)
                              .put(proController.updateById)
                              .delete(proController.deleteById);

module.exports = promoRouter;