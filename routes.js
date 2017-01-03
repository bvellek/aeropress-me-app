module.exports = function(app, passport) {


//Landing Page
  app.get('/', (req, res) => {
    res.render('index.pug', {title: 'AeroPressMe', message: req.flash('loginMessage')});
  });

  //Login form
  app.post('/', passport.authenticate('local-login', {
    successRedirect: '/myrecipes',
    failureRedirect: '/',
    failureFlash: true
  }));

//Registration Page
  app.get('/registration', (req, res) => {
    res.render('registration.pug', {title: 'Register AeroPressMe', message: req.flash('registrationMessage')});
  });

  //Registration form
  app.post('/registration', passport.authenticate('local-signup', {
    successRedirect: '/myrecipes',
    failureRedirect: '/registration',
    failureFlash: true
  }));


// My Recipes Page
  app.get('/myrecipes', isLoggedIn, (req, res) => {
    res.render('myrecipes.pug', {
      user: req.user,
      title: 'My AeroPressMe Recipes'
    });
  });


//Logout Route


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
    res.redirect('/myrecipes');
  }

}
