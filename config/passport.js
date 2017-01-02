const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


module.exports = function(passport) {

  //session setup

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });





  //Local registration

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({'email': email}, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, req.flash('registrationMessage', 'That email is already taken.'));
        } else if (!(password === req.body['user-confirm-password'])) {
          return done(null, false, req.flash('registrationMessage', 'Passwords do not match.'))
        } else {
          const newUser = new User();
          newUser.email = email;
          newUser.password = newUser.hashPassword(password);
          newUser.firstName = req.body.firstName;
          newUser.lastName = req.body.lastName;
          newUser.save(err => {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));


  //Local Login

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    // console.log('.', req, email);
    User.findOne({'email' : email}, function(err, user) {
      // console.log('..', user, err);
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Oops! Password is incorrect.'));
      }
      return done(null, user);
    });
  }));
};
