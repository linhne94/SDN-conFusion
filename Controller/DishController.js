const Dishes = require('../Models/Dishes')

const index = (req, res, next) => {
    Dishes.find({})
        .populate('comments.author')
        .then((dishes) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes);
        }, (err) => next(err))
        .catch((err) => next(err));
}


const add = (req, res, next) => {
    Dishes.create(req.body)
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
    res.end('PUT operation not supported on /dishes');
}

const deleteDish = (req, res, next) => {
    Dishes.deleteMany({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        })
        .catch((err) => next(err));
}

const getById = (req, res, next) => {
    Dishes.findById(req.params.dishId)
        .populate('comments.author')
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
}


const updateById = (req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
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
    Dishes.findByIdAndRemove(req.params.dishId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

// get comment of dishes
// get cmmt
const comment = (req, res, next) => {
    Dishes.findById(req.params.dishId)
        .populate('comments.author')
        .then((dish) => {
            if (dish != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish.comments);
            }
            else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
}

// add commt
const addComment = (req, res, next)  => {
    Dishes.findById(req.params.dishId)
        .then((dish) => {
            if (dish != null) {
                req.body.author = req.user._id;
                dish.comments.push(req.body);
                dish.save()
                    .then((dish) => {
                        Dishes.findById(dish._id)
                            .populate('comments.author')
                            .then((dish) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(dish);
                            })
                    }, (err) => next(err));
            }
            else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
}

// getCmt

const commentById = (req, res, next) => {
	    Dishes.findById(req.params.dishId)
	    .populate('comments.author')    
	    .then((dish) => {
	        if (dish != null && dish.comments.id(req.params.commentId) != null) {
	            res.statusCode = 200;
	            res.setHeader('Content-Type', 'application/json');
	            res.json(dish.comments.id(req.params.commentId));
	        }
	        else if (dish == null) {
	            err = new Error('Dish ' + req.params.dishId + ' not found');
	            err.status = 404;
	            return next(err);
	        }
	        else {
	            err = new Error('Comment ' + req.params.commentId + ' not found');
	            err.status = 404;
	            return next(err);            
	        }
	    }, (err) => next(err))
	    .catch((err) => next(err));
	}
// update cmt 

const updateCmt = (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            dish.save()
            .then((dish) => {
                Dishes.findById(dish._id)
                .populate('comments.author')
                .then((dish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);  
                })              
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}
    
// delete cmt 

const deleteComment = ( req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {

            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish) => {
                Dishes.findById(dish._id)
                .populate('comments.author')
                .then((dish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);  
                })               
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}
    

module.exports = {
    index, add, update, deleteDish, getById, updateById, deleteById, commentById, comment, addComment, deleteComment, updateCmt
}