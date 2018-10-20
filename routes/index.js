const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/', (req, res) => {
   res.render('home');
});

router.get('/register', (req, res) => {
   res.render('register');
});

router.post('/register', (req, res) => {
   let newUser = new User({
      email: req.body.email,
      username: req.body.username
   });
   User.register(newUser, req.body.password, (err, user) => {
      if (err) return res.render('register');

      passport.authenticate('local')(req, res, () => {
         res.render('home');
      });
   });
});

router.get('/login', (req, res) => {
   res.render('login');
});

router.post('/login', passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/login'
}), (req, res) => {});

router.get('/logout', (req, res) => {
   req.logout();
   req.flash('success', "You've been logged out");
   res.render('home');
});

module.exports = router;