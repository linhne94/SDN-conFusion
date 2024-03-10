var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors')

var config = require('./config');




// Require routes
var dishRouter = require("./routes/dishRouter");
var promotionRouter = require("./routes/promoRouter");
var toppingRouter = require("./routes/toppingRouter");
const docRouter = require("./routes/documentRouter");
const youRouter = require("./routes/youtubeRouter");
const cakeRoute = require("./routes/CakeRoute");
const userRoute = require('./routes/UserRouter')
const uploadRouter = require('./routes/uploadRouter')
//
// connection mongoose db
mongoose.connect(config.mongoUrl)
db = mongoose.connection;

db.on('err', (err) => {
  console.log('nonononono');

})
db.once('open', () => {
  console.log('oke oke ');
})
//

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cookieParser('12345-67890'));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Session middleware setup
var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

// Passport middleware setup
app.use(passport.initialize());
app.use(passport.session());

// Authentication middleware
// function auth(req, res, next) {
//     console.log(req.user);

//     if (!req.user) {
//       var err = new Error('You are not authenticated!');
//       err.status = 403;
//       return next(err);
//     }
//     next();
// }

// Use authentication middleware
app.use("/users", userRoute)
// app.use(auth); excersise 18

// Register routes
app.use("/dishes", dishRouter);
app.use("/promotions", promotionRouter);
app.use("/toppings", toppingRouter);
app.use("/cakes", cakeRoute);
app.use("/documents", docRouter);
app.use("/youtubes", youRouter);
app.use('/imageUpload', uploadRouter);

// 404 Error handling
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handling middleware
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
