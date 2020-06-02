var express = require('express');
var router = express.Router();
var mainController = require('../controllers/main.controller')
var main = new mainController();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport')
router.use(csrfProtection)

router.get('/logout', isLoggedIn, function (req, res, next){
  req.logout();
  res.redirect("/")
})

router.use('/', notLoggedIn, function(req, res, next){
  next();
})

router.get('/signin', function(req, res, next) {
  // console.log("----------user----------",req.user)
  var messages = req.flash('error')
  res.render('auth/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.get('/signup', function(req, res, next) {
  var messages = req.flash('error')
  res.render('auth/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: 'signin',
  failureRedirect: 'signup',
  failureFlash: true
}))

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
}))



module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}