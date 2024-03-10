const Promotion = require('../Models/Promotions')

const index = (req, res, next) => {
    Promotion.find({}).then((Promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Promotion)
    }, (err) => next(err))
        .catch((err) => next(err))
}

const add = (req, res, next) => {
    Promotion.create(req.body)
        .then((dish) => {
            console.log('Dish Created ', dish);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);

        })
        .catch((err) => next(err));
}

const update = (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Promotion');
}

const deletePro = (req, res, next) => {
    Promotion.deleteMany({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        })
        .catch((err) => next(err));
}

const getById = (req, res, next) => {
    Promotion.findById(req.params.promoId)
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const updateById = (req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
}
const deleteById = (req, res, next) => {
    Promotion.findOneAndDelete(req.params.promoId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}
module.exports = {
    index, add, update, deletePro , getById, updateById, deleteById
}