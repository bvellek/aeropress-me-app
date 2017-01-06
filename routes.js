const Recipe = require('./models/recipe');
const User = require('./models/user');
const Vote = require('./models/vote');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function(app, passport) {

//Landing Page
  app.get('/', (req, res) => {
    res.render('index', {title: 'AeroPressMe', message: req.flash('loginMessage')});
  });

  app.post('/', passport.authenticate('local-login', {
    successRedirect: '/myrecipes',
    failureRedirect: '/',
    failureFlash: true,
    session: true
  }));


//Registration Page
  app.get('/registration', (req, res) => {
    res.render('registration', {title: 'Register AeroPressMe', message: req.flash('registrationMessage')});
  });

  app.post('/registration', passport.authenticate('local-signup', {
    successRedirect: '/myrecipes',
    failureRedirect: '/registration',
    failureFlash: true,
    session: true
  }));


// My Recipes Page
  app.get('/myrecipes', isLoggedIn, (req, res) => {
    Recipe
    .find({ownerID: req.user.id}, function(err, recipes) {
      res.render('myrecipes', {
        title: 'My AeroPressMe Recipes',
        recipes: recipes
      });
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
    let body = Object.assign({}, req.body);
    if (body.author === '') {
      body.author = titleCase(`${req.user.firstName} ${req.user.lastName}`);
    }
    if (body.title === '') {
      delete body.title;
    }
    Recipe
      .create(Object.assign({'ownerID': req.user.id}, body))
      .then(res.redirect('/myrecipes'))
      .then(res.end())
      .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went wrong'});
      });
  });


// All Recipes Page
  app.get('/allrecipes', isLoggedIn, (req, res) => {
    Recipe.find(function(err, recipes) {
      res.render('allrecipes', {
        title: 'All Recipes',
        recipes: recipes
      });
    });
  });

  app.post('/allrecipes/:id', isLoggedIn, (req, res) => {
    Vote
    // .findById()
    .create(Object.assign({
      'voterID': req.user.id
      //recipe ID
    }))
    .then(res.redirect('/allrecipes'))
    .then(res.end())
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
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


//Functions
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

  function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

}
