const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const dishRouter = express.Router();
const DishController = require('../Controller/DishController');
const cors = require('./Cors');

dishRouter.use(bodyParser.json());

// Áp dụng CORS cho tất cả các tuyến đường trong dishRouter


dishRouter.route('/').options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, DishController.index)
    .post(authenticate.verifyUser, DishController.add)
    .put(authenticate.verifyUser, DishController.update)
    .delete(authenticate.verifyUser, DishController.deleteDish);

dishRouter.route('/:dishId').options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(authenticate.verifyUser, DishController.getById)
    .put(authenticate.verifyUser, DishController.updateById)
    .delete(authenticate.verifyUser, DishController.deleteById);

dishRouter.route('/:dishId/comments').options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(DishController.comment)
    .post(authenticate.verifyUser, DishController.addComment);

dishRouter.route('/:dishId/comments/:commentId').options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(DishController.commentById)
    .put(authenticate.verifyUser, DishController.updateCmt)
    .delete(authenticate.verifyUser, DishController.deleteComment);

module.exports = dishRouter;
