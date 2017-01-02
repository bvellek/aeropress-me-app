const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models/user');


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

  passport.use('local-registration', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, firstName, lastName, done) {
    process.nextTick(() => {
      User.findOne({'email': email}, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, req.flash('registrationMessage', 'That email is already taken.'));
        } else {
          const newUser = new User();
          newUser.email = email;
          newUser.password = newUser.hashPassword(password);
          newUser.firstName = firstName;
          newUser.lastName = lastName;
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
};
