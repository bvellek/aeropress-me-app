const Recipe = require('./models/recipe');
const User = require('./models/user');
const Vote = require('./models/vote');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function(app, passport) {

  // Landing Page - serve recipes sorted by upvotes


  // app.get('/', (req, res) => {
  //   res.render('login', {
  //          title: 'AeroPressMe',
  //        message: 'loginMessage'})
  // });



  app.get('/', (req, res) => {
    Recipe.find(function(err, recipes) {
      let recipePromises = recipes.map((recipe) => {
        return getVotesByRecipeID(recipe.id).then((votes) => {
          recipe.votes = votes;
          return recipe;
        });
      });

      Promise.all(recipePromises).then((recipesWithVotes) => {
          recipesWithVotes.sort((a, b) => {
            if (b.votes > a.votes) {
              return 1
            } else if (a.votes > b.votes) {
              return -1
            } else {
              return 0
            }
          })
          return recipesWithVotes;
        })
        .then(function(recipesWithVotes) {
          res.status(200).render('index', {
            title: 'AeroPressMe',
            recipes: recipesWithVotes
          });
        });
    });
  });


  // Login Page
  app.get('/login', (req, res) => {
    res.render('login', {
      title: 'AeroPressMe Login',
      message: req.flash('loginMessage')
    });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/myrecipes',
    failureRedirect: '/login',
    failureFlash: true,
    session: true
  }));


  // Registration Page
  app.get('/registration', (req, res) => {
    res.render('registration', {
      title: 'Register AeroPressMe',
      message: req.flash('registrationMessage')
    });
  });

  app.post('/registration', passport.authenticate('local-signup', {
    successRedirect: '/myrecipes',
    failureRedirect: '/registration',
    failureFlash: true,
    session: true
  }));


  // My Recipes Page - serve logged in user's recipes sorted by upvotes
  app.get('/myrecipes', isLoggedIn, (req, res) => {
    Recipe.find({
      ownerID: req.user.id
    }, function(err, recipes) {
      let recipePromises = recipes.map((recipe) => {
        return getVotesByRecipeID(recipe.id).then((votes) => {
          recipe.votes = votes;
          return recipe;
        });
      })
      Promise.all(recipePromises).then((recipesWithVotes) => {
          recipesWithVotes.sort((a, b) => {
            if (b.votes > a.votes) {
              return 1
            } else if (a.votes > b.votes) {
              return -1
            } else {
              return 0
            }
          })
          return recipesWithVotes;
        })
        .then(function(recipesWithVotes) {
          res.render('myrecipes', {
            title: 'My AeroPressMe Recipes',
            recipes: recipesWithVotes
          });
        })
    });
  });

  // Delete Recipe and all votes associated with the recipe
  app.post('/myrecipes/:id', isLoggedIn, (req, res) => {
    Vote
      .find({
        'recipeID': req.params.id
      })
      .remove()
      .exec();
    Recipe
      .findByIdAndRemove(req.params.id)
      .exec()
      .then(res.redirect('/myrecipes'))
      .then(res.end());
  });


  // Edit Recipe Page
  app.get('/editrecipe/:id', isLoggedIn, (req, res) => {
    Recipe
      .findById(req.params.id, (err, recipe) => {
        res.render('editrecipe', {
          title: 'Edit My AeroPressMe Recipe',
          recipe: recipe
        });
      });
  });

  app.post('/editrecipe/:id', isLoggedIn, (req, res) => {
    const updated = {};
    const updateableFields = ['title', 'orientation', 'author', 'massWater', 'massCoffee', 'grind', 'instructions'];
    updateableFields.forEach(field => {
      if (field in req.body) {
        updated[field] = req.body[field];
      }
    });
    Recipe
      .findByIdAndUpdate(req.params.id, {
        $set: updated
      }, {
        new: true
      })
      .exec()
      .then(res.redirect('/myrecipes'))
      .then(res.end())
      .catch(err => {
        console.error(err);
        res.status(500).json({
          error: 'something went wrong'
        });
      });
  });


  //New Recipe Page - Create a new recipe
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
        res.status(400).json({
          error: `Missing "${field}" in request body`
        });
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
      .create(Object.assign({
        'ownerID': req.user.id
      }, body))
      .then(res.redirect('/myrecipes'))
      .then(res.end())
      .catch(err => {
        console.error(err);
      });
  });


  // All Recipes Page - sorted by upvotes
  app.get('/allrecipes', isLoggedIn, (req, res) => {
    Recipe.find(function(err, recipes) {
      let recipePromises = recipes.map((recipe) => {
        return getVotesByRecipeID(recipe.id).then((votes) => {
          recipe.votes = votes;
          return recipe;
        });
      });
      Promise.all(recipePromises).then((recipesWithVotes) => {
          recipesWithVotes.sort((a, b) => {
            if (b.votes > a.votes) {
              return 1
            } else if (a.votes > b.votes) {
              return -1
            } else {
              return 0
            }
          })
          return recipesWithVotes;
        })
        .then(function(recipesWithVotes) {
          res.render('allrecipes', {
            title: 'All AeroPressMe Recipes',
            recipes: recipesWithVotes,
            message: req.flash('voteMessage')
          });
        });
    });
  });

  // Upvote Recipe - upvote recipe if logged in user hasn't already upvoted
  app.post('/allrecipes', isLoggedIn, (req, res) => {
    Vote.findOne({
      'recipeID': req.body.recipeID,
      'voterID': req.user.id
    }, (err, vote) => {
      if (err) {
        console.error(err);
      }
      if (vote) {
        // console.log('SHOULD FLASH!!');
        req.flash('voteMessage', 'You have already upvoted this recipe.');
        res.redirect('/allrecipes');
      } else {
        Vote
          .create(Object.assign({
            'voterID': req.user.id,
            'recipeID': req.body.recipeID
          }))
          .then(res.redirect('/allrecipes'))
          .then(res.end())
          .catch(err => {
            console.error(err);
          });
      }
    });
  });


  //Logout Route
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


  //Google Routes
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/myrecipes',
    failureRedirect: '/'
  }));



  //API Endpoints
  // Vote with AJAX request from frontend


  app.post('/api/allrecipes', isLoggedIn, (req, res) => {
    console.log('This is my message: ', req.user.id, req.body.recipeID);
    Vote.findOne({
      'recipeID': req.body.recipeID,
      'voterID': req.user.id
    }, (err, vote) => {
      if (err) {
        console.error(err);
      }
      if (vote) {
        res.status(200).json({'noVoteMessage': 'You have already upvoted this recipe'});
      } else {
        Vote
          .create(Object.assign({
            'voterID': req.user.id,
            'recipeID': req.body.recipeID
          }))

          .then(() => { getVotesByRecipeID(req.body.recipeID)
          .then((votes) => res.status(201).json({'recipeVotes': votes}))
          .catch(err => {
            console.error(err);
            res.status(500).json({
              error: 'Something went wrong'
            })}
          )});
      }
    });
  });







  // app.get('/api/recipes', (req, res) => {
  //   Recipe.find(function(err, recipes) {
  //     let recipePromises = recipes.map((recipe) => {
  //       return getVotesByRecipeID(recipe.id).then((votes) => {
  //         recipe.votes = votes;
  //         return recipe;
  //       });
  //     });
  //     Promise.all(recipePromises).then((recipesWithVotes) => {
  //       res.json(recipesWithVotes);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       res.status(500).json({error: `Something went wrong`});
  //     });
  //   });
  // });
  //
  // app.post('/api/recipes', (req, res) => {
  //   const requiredFields = ['orientation', 'massWater', 'massCoffee', 'waterTemp', 'grind', 'instructions'];
  //   requiredFields.forEach(field => {
  //     if (!(field in req.body)) {
  //       res.status(400).json({error: `Missing "${field}" in request body`});
  //   }});
  //
  //   Recipe
  //     .create(Object.assign({}, req.body))
  //     .then(recipe => {
  //       res.status(201).json(recipe)
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       res.status(500).json({error: 'Something went wrong.'})
  //     });
  // });
  //
  // app.put('/api/recipes/:id', (req, res) => {
  //   if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
  //     res.status(400).json({error: `Request path id and request body id values must match`});
  //   }
  //
  //   const updated = {};
  //   const updateableFields = ['title', 'author', 'orientation', 'massWater', 'massCoffee', 'waterTemp', 'grind', 'instructions'];
  //   updateableFields.forEach(field => {
  //     if (field in req.body) {
  //       updated[field] = req.body[field];
  //     }
  //   });
  //
  //   Recipe
  //     .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
  //     .exec()
  //     .then(updatedRecipe => {
  //       res.status(201).json(updatedRecipe)
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       res.status(500).json({error: `Something went wrong.`})
  //     });
  // });
  //
  // app.delete('/api/recipes/:id', (req, res) => {
  //   Recipe
  //     .findByIdAndRemove(req.params.id)
  //     .exec()
  //     .then(() => {
  //       console.log(`Deleted recipe with id "${req.params.id}".`);
  //       res.status(204).end();
  //     });
  // });





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



  function getVotesByRecipeID(recipeID) {
    return new Promise(function(res, rej) {
      // let VoterModel = mongoose.model('Vote', voteSchema);
      Vote
        .find({
          'recipeID': recipeID
        })
        .exec(function(err, results) {
          if (err) {
            rej(err);
          } else {
            let count = results.length
            res(count);
          }
        });
    })
  }
}
