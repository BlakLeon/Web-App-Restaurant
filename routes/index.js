var express = require('express');
var router = express.Router();
var mainController = require('../controllers/main.controller')
var main = new mainController();
var bodyParser = require('body-parser');
var User = require('../models/user');
var Booking = require('../models/booking')
router.use(bodyParser.json());

var csrf = require('csurf');
var csrfProtection = csrf();

var passport = require('passport')

router.use(csrfProtection)

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log("----------user----------",req.user)
  res.render('index', { user: req.user });
});

router.get('/book', isLoggedIn, function(req, res, next){
  res.render('booking', { csrfToken: req.csrfToken(), user: req.user })
})

router.get('/dashboard', isLoggedIn, function(req, res, next){
  if(req.user.role == 2){
    Booking.find(function(err, docs){
      res.render('dashboard/res_manage', { csrfToken: req.csrfToken(), user: req.user, bookdata: docs})
    })
  }
  else if(req.user.role == 3){
    User.find(function(err, docs) {
      res.render('dashboard/user_manage', { csrfToken: req.csrfToken(), user: req.user, userdata: docs})
    })
  }
  else{
    res.redirect('/');
  }
})


router.get('/userDelete/:userID', isLoggedIn, main.deleteUser)
router.post('/userUpdate', isLoggedIn, main.updateUser)

router.post('/booking', isLoggedIn, main.addBooking)
router.get('/approveBooking/:userID', isLoggedIn, main.approveBooking)
router.get('/rejectBooking/:userID', isLoggedIn, main.rejectBooking)

router.get('/test', main.test);

module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}