var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
})

//middleware to check if user is logged in
function checkIfUserIsLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    next();
  } else {
    res.redirect('/');
  }
}


// Logging in
router.post('/login', passport.authenticate('local'), function(req, res, next) {
  res.redirect('/');
});

// Logging out
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

// Creating an account
router.post('/signup', function(req, res, next) {
  var user = new User({ username: req.body.username });
  User.register(user, req.body.password, function(error){
    if (error){
      res.send(error);
    } else {
      req.login(user, function(loginError){
        if (loginError) {
          res.send(loginError);
        } else {
          res.redirect('/');
        }
      })
    }
  })
});



module.exports = router;
