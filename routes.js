module.exports = function(app, passport) {


//Landing Page
  app.get('/', (req, res) => {
    res.render('index.pug');
  });


//Registration Page
  app.get('/registration', (req, res) => {
    res.render('registration.pug', {message: req.flash('registerMessage')});
  });


//My Recipes Page
  // app.get('/myrecipes', isLoggedIn, (req, res) => {
  //   res.render('myrecipes.pug', {
  //     user: req.user
  //   });
  // });



}
