const express = require('express')
const userRouter = express.Router()

var passport = require('passport')
var authenticate = require('../authenticate');
const UserController = require('../Controller/UsersController')



userRouter.post('/signup', UserController.signUp);

userRouter.post('/login', passport.authenticate('local'), UserController.logIn);

userRouter.get('/logout', UserController.logOut);

userRouter.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {

    if (req.user) {
        var token = authenticate.getToken({ _id: req.user._id });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, token: token, status: 'You are successfully logged in!' });
    }
});



module.exports = userRouter