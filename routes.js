const Recipe = require('./models/recipe');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function(app, passport) {


//Landing Page
  app.get('/', (req, res) => {
    res.render('index', {title: 'AeroPressMe', message: req.flash('loginMessage')});
  });

  //Login form
  app.post('/', passport.authenticate('local-login', {
    successRedirect: '/myrecipes',
    failureRedirect: '/',
    failureFlash: true
  }));

//Registration Page
  app.get('/registration', (req, res) => {
    res.render('registration', {title: 'Register AeroPressMe', message: req.flash('registrationMessage')});
  });

  //Registration form
  app.post('/registration', passport.authenticate('local-signup', {
    successRedirect: '/myrecipes',
    failureRedirect: '/registration',
    failureFlash: true
  }));


// My Recipes Page
  app.get('/myrecipes', isLoggedIn, (req, res) => {
    res.render('myrecipes', {
      user: req.user,
      title: 'My AeroPressMe Recipes'
    });
  });

//New Recipe Page
  app.get('/newrecipe', isLoggedIn, (req, res) => {
    res.render('newrecipe', {
      user: req.user,
      title: 'New AeroPressMe Recipe'
    });
  });

  app.post('/newrecipe', isLoggedIn, (req, res) => {
    const requiredFields = ['orientation', 'massWater', 'massCoffee', 'waterTemp', 'grind', 'instructions'];
    requiredFields.forEach(field => {
      if (!(field in req.body)) {
        res.status(400).json(
          {error: `Missing "${field}" in request body`});
        }
      });
    Recipe
      .create(Object.assign({}, req.body))
      .then(recipe => res.status(201).json(recipe)) //.apiRepr()))
      .then(res.redirect('/myrecipes'))
      .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went wrong'});
      });
  });

// All Recipes Page
  app.get('/allrecipes', isLoggedIn, (req, res) => {
    Recipe
      .find()
      .exec()
      .then(recipes => {
        res.json(recipes) //.map(method => method.apiRepr()))
        })
      .then(
        res.render('allrecipes', {
        user: req.user,
        title: 'AeroPressMe Recipes'}))
      .catch(err => {
        console.error(err);
        res.status(500).json({error: 'somethign went wrong'});
      });
  });


//Logout Route
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

//Google Routes
  app.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));

  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/myrecipes',
    failureRedirect: '/'
  }));


  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

}
