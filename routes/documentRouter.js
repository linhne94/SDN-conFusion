const express = require('express');
const docRouter = express.Router();

const DocController = require('../Controller/DocumentController');

docRouter.get('/', DocController.index);
docRouter.get('/show', DocController.show);
docRouter.post('/',DocController.add);
docRouter.put('/', DocController.update)

module.exports = docRouter;


