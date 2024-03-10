const Cake = require('../Models/Cake')

// get api 

const index = (req, res, next) => {
    Cake.find({}).then((youtube) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(youtube)
    }, (err) => next(err))
        .catch((err) => next(err))
}

const getById = (req, res, next) => {
    Cake.findById(req.params.cakeId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

// add api

const addCake = (req, res, next) => {
    
    Cake.create(req.body)
        .then((resp) => {
            console.log('Cake Created ', resp);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);

        })
        .catch((err) => next(err));
}

// update api 

const update = (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Cake');
}

const updateById = (req, res, next) => {
    Cake.findByIdAndUpdate(req.params.cakeId, {
        $set: req.body
    }, { new: true })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}
// delete api 
const deleteAll = (req, res, next) => {
    Cake.deleteMany({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        })
        .catch((err) => next(err));
}

const deleteById = (req, res, next) => {
    Cake.findOneAndDelete(req.params.cakeId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

module.exports = {
    index, getById, addCake, update, updateById, deleteAll , deleteById
}