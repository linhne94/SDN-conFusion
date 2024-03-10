const User = require('../Models/Users')
var passport = require('passport')
var authenticate = require('../authenticate');


const signUp = (req, res, next) => {
    User.register(new User({ username: req.body.username }), req.body.password)
      .then(user => {
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        return user.save();
      })
      .then(user => {
        const token = authenticate.getToken({ _id: user._id });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: 'Registration Successful!', token: token });
      })
      .catch(err => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      });
  };
    


const logIn = (req, res, next) => {
    var token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!' });

};


const logOut = (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
}

module.exports = {
    signUp, logIn, logOut
}