const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs');
const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/log')
    }
  )


  router.get('/login_m', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/log',
      failureRedirect: '/login_error',
    })(req, res, next);
  });

  router.post('/login_m', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/login',
      failureRedirect: '/login_error',
    })(req, res, next);
  });

 

  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
  
  module.exports = router