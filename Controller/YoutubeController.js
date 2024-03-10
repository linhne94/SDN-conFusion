
const Youtube = require('../Models/Youtube')
// get api 

const index = (req, res, next) => {
    Youtube.find({}).then((youtube) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(youtube)
    }, (err) => next(err))
        .catch((err) => next(err))
}

const getById = (req, res, next) => {
    Youtube.findById(req.params.youtubesId)
        .then((youtube) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(youtube);
        }, (err) => next(err))
        .catch((err) => next(err));
}

// add api 

const addYoutube = (req, res, next) => {
    Youtube.create(req.body)
        .then((youtube) => {
            console.log('youtube Created ', youtube);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(youtube);

        })
        .catch((err) => next(err));
}

// update api 

const update = (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /youtube');
}

const updateById = (req, res, next) => {
    Youtube.findByIdAndUpdate(req.params.youtubesId, {
        $set: req.body
    }, { new: true })
        .then((youtube) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(youtube);
        }, (err) => next(err))
        .catch((err) => next(err));
}

// delete api

const deleteAll = (req, res, next) => {
    Youtube.deleteMany({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        })
        .catch((err) => next(err));
}

const deleteById = (req, res, next) => {
    Youtube.findOneAndDelete(req.params.youtubesId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

module.exports = {
    index, getById, addYoutube, update, updateById, deleteAll, deleteById
}

