module.exports = function(app, passport) {


//Landing Page
  app.get('/', (req, res) => {
    res.render('index.pug');
  });

  //Login form
  app.post('/', passport.authenticate('local-login', {
    successRedirect: '/myrecipes',
    failureRedirect: '/',
    failureFlash: true
  }));

//Registration Page
  app.get('/registration', (req, res) => {
    res.render('registration.pug', {message: req.flash('registerMessage')});
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
      user: req.user
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/myrecipes');
  }

}
