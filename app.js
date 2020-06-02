var createError = require('http-errors');
var express = require('express'),
  engine = require('ejs-locals'),
  app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session')
var passport = require('passport')
var flash = require('connect-flash')
var validator = require('express-validator')

var app = express();

const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost/test';
mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  console.error(err || `Connected to MongoDB: ${MONGOURL}`);
});
require('./config/passport')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  useUnifiedTopology: true
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
})

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use(cors());


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;