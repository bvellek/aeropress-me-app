const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

// Access to start and stop the server as well as connect to the DB
const {DATABASE_URL, PORT} = require('../config/config');
const {app, runServer, closeServer} = require('../server');

// Access to models for recipes, users, and votes
const Recipe = require('../models/recipe');
const User = require('../models/user');
const Vote = require('../models/vote');

// Zombie rquirements (Headless DOM)
const Browser = require('zombie');
const assert = require('assert');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHTTP);



function seedRecipeData() {
  console.log('seeding Recipe data');
  const seedData = [];

  for (let i = 0; i <= 10; i++) {
    seedData.push(generateRecipeData());
  }
  return Recipe.insertMany(seedData);
}

function generateRecipeOrientation() {
  const orientations = ['Standard', 'Inverted'];
  return orientations[Math.floor(Math.random() * orientations.length)];
}

function generateRecipeGrind() {
  const grinds = ['Extra Coarse', 'Coarse', 'Medium-Coarse', 'Medium', 'Medium-Fine', 'Fine', 'Extra Fine'];
  return grinds[Math.floor(Math.random() * grinds.length)];
}

function generateRecipeData() {
  return {
    title: faker.lorem.words(),
    author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    orientation: generateRecipeOrientation(),
    massWater: faker.random.number(),
    massCoffee: faker.random.number(),
    waterTemp: faker.random.number(),
    grind: generateRecipeGrind(),
    instructions: faker.lorem.paragraph(),
    ownerID: 'test-user'
  }
}

function seedTestUser() {
  console.log('seeding test user');
  const seedUsers = [];
  seedUsers.push(generateTestUser());
  return User.insertMany(seedUsers);
}

function generateTestUser() {
  return {
  	lastName : "user",
  	firstName : "test",
  	password : "$2a$10$jrnUFAwvmxuoMbHIi8jEOeuWNwo.B4041lCmQ7xFwlOFzgOhAGaZ6",
  	email : "testuser@aeropressme.com",
  }
}

function seedTestRecipe() {
  console.log('seeding test recipe');
  const seedRecipes = [];
  seedRecipes.push(generateTestRecipe());
  return Recipe.insertMany(seedRecipes);
}

function generateTestRecipe() {
    return {
      title: 'Test Recipe 1',
      author: `${faker.name.firstName()} ${faker.name.lastName()}`,
      orientation: generateRecipeOrientation(),
      massWater: faker.random.number(),
      massCoffee: faker.random.number(),
      waterTemp: faker.random.number(),
      grind: generateRecipeGrind(),
      instructions: faker.lorem.paragraph(),
      ownerID: 'test-user',
    }
}

function tearDownDb() {
  console.warn('Deleting DB');
  return mongoose.connection.dropDatabase();
}


describe('Render Pages', function() {


  before(function() {
    // before the tests seed some recipe data a test user
    seedRecipeData();
    seedTestRecipe();
    seedTestUser();
    return runServer().then((port) => {
      Browser.localhost('localhost', port);
      this.browser = new Browser();
      this.browser.runScripts = false;
    });
  });

  after(function() {
    // after tests delete the database
    return tearDownDb()
    .then(() => {
      return closeServer();
    })
  });


  describe('Landing Page', () => {

    it('should show HTML', () => {
      const resolvingPromise = new Promise((resolve, reject) => {
        chai.request(app)
          .get('/')
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.html;
            resolve('it resolved');
          });
      });
      return resolvingPromise.then((result) => {
        expect(result).to.equal('it resolved');
      });
    });
  });

  describe('Login Page', () => {
    // load the login page
    before(function(done) {
      this.browser.visit('/login', done);
    });


    it('should show a login form', function() {
      assert.ok(this.browser.success);
      assert.equal(this.browser.text('form legend'), 'Login');

    });

    it('should have email input and password input with a method of post for login form', function() {
      this.browser.assert.element('#user-email');
      this.browser.assert.element('#password');
      this.browser.assert.attribute('form', 'method', 'post');
    });

    it('should show fail message for incorrect username', function(done) {
      this.browser.fill('#user-email', 'notauser@mail.com');
      this.browser.fill('#password', 'incorrectpassword');
      this.browser.pressButton('button').then(() => {
        assert.ok(this.browser.success);
        assert.equal(this.browser.text('section.flash-alert'), 'No user found.');
      }).then(done, done);
    });

    it('should show fail message for incorrect password', function(done) {
      this.browser.fill('#user-email', 'testuser@aeropressme.com');
      this.browser.fill('#password', 'incorrectpassword');
      this.browser.pressButton('button').then(() => {
        assert.ok(this.browser.success);
        assert.equal(this.browser.text('section.flash-alert'), 'Oops! Password is incorrect.');
      }).then(done, done);
    });
  })


  describe('Registration Page', () => {
    // Load the Registration page
    before(function(done) {
      this.browser.visit('/registration', done);
    });


    it('should show a registration form', function() {
      assert.ok(this.browser.success);
      assert.equal(this.browser.text('form legend'), 'Registration Information');
    });

    it('should have first name, last name, email, password, and confirm password inputs with a method of post', function() {
      this.browser.assert.element('#reg-author-first');
      this.browser.assert.element('#reg-author-last');
      this.browser.assert.element('#reg-email');
      this.browser.assert.element('#reg-password');
      this.browser.assert.element('#reg-confirm-password');
      this.browser.assert.attribute('form', 'method', 'post');
    });

    it('should show fail message for email already in use', function(done) {
      this.browser.fill('#reg-author-first', 'Test');
      this.browser.fill('#reg-author-last', 'User');
      this.browser.fill('#reg-email', 'testuser@aeropressme.com');
      this.browser.fill('#reg-password', 'password');
      this.browser.fill('#reg-confirm-password', 'password');
      this.browser.pressButton('button').then(() => {
        assert.ok(this.browser.success);
        assert.equal(this.browser.text('section.flash-alert'), 'That email is already taken.');
      }).then(done, done);
    });

    it('should show fail message for non-matching password and confirm password fields', function(done) {
      this.browser.fill('#reg-author-first', 'Test');
      this.browser.fill('#reg-author-last', 'User');
      this.browser.fill('#reg-email', 'newuser@aeropressme.com');
      this.browser.fill('#reg-password', 'password');
      this.browser.fill('#reg-confirm-password', 'NOTpassword');
      this.browser.pressButton('button').then(() => {
        assert.ok(this.browser.success);
        assert.equal(this.browser.text('section.flash-alert'), 'Passwords do not match.');
      }).then(done, done);
    });
  })


  describe('My Recipes Page', () => {
    // Load the login page & sign in with testuser@aeropressme.com
    before(function(done) {
      this.browser.visit('/login')
        .then(() => {
          this.browser.fill('#user-email', 'testuser@aeropressme.com');
          this.browser.fill('#password', 'password');
        })
        .then(() => {
          return this.browser.pressButton('button');
        })
        .then(done, done);
    });

    //Logout after tests are done for My Recipes Page
    after(function(done) {
      this.browser.visit('/login')
      .then(done, done);
    });


    it('should show a "my recipes" header', function() {
      assert.ok(this.browser.success);
      assert.equal(this.browser.text('.your-recipes-page h1'), 'My Recipes');
    });

  })


  describe('Submit New Recipe Page', () => {
    // Load the login page & sign in with testuser@aeropressme.com & visit New Recipe Page
    before(function(done) {
      this.browser.visit('/login')
        .then(() => {
          this.browser.fill('#user-email', 'testuser@aeropressme.com');
          this.browser.fill('#password', 'password');
        })
        .then(() => {
          return this.browser.pressButton('button');
        })
        .then(() => {
          return this.browser.visit('/newrecipe');
        })
        .then(done, done);
    });

    //Logout after tests are done for New Recipe Page
    after(function(done) {
      this.browser.visit('/login')
      .then(done, done);
    });


    it('should show a "New AeroPress Recipe" header', function() {
      assert.ok(this.browser.success);
      assert.equal(this.browser.text('.input-page h1'), 'New AeroPressME Recipe');
    });

    it('should have a "New Recipe" form with method post and appropriate form inputs', function() {
      this.browser.assert.attribute('form', 'method', 'post');
      this.browser.assert.element('#input-title');
      this.browser.assert.element('#input-author');
      this.browser.assert.element('#standard');
      this.browser.assert.element('#inverted');
      this.browser.assert.element('#water');
      this.browser.assert.element('#coffee');
      this.browser.assert.element('#water-temp');
      this.browser.assert.element('#grind-select');
      this.browser.assert.element('#instructions');
    })

  })


  describe('All Recipes Page', () => {
    // Load the login page & sign in with testuser@aeropressme.com & visit All recipes page
    before(function(done) {
      this.browser.visit('/login')
        .then(() => {
          this.browser.fill('#user-email', 'testuser@aeropressme.com');
          this.browser.fill('#password', 'password');
        })
        .then(() => {
          return this.browser.pressButton('button');
        })
        .then(() => {
          return this.browser.visit('/allrecipes');
        })
        .then(done, done);
    });

    //Logout after tests are done for All Recipes Page
    after(function(done) {
      this.browser.visit('/login')
      .then(done, done);
    });


    it('should show a "Top Recipes" header', function() {
      assert.ok(this.browser.success);
      assert.equal(this.browser.text('.recipes-page h1'), 'Top Recipes');
    });

    var testRecipe;
    it('should vote on a recipe', function() {
      testRecipe = this.browser.querySelector('.recipe-card').getAttribute('id');
      return this.browser.pressButton(`#${testRecipe} button`);
    });

    it('should show a "already voted error message" when upvote button is clicked on same recipe', function(done) {
      this.browser.pressButton(`#${testRecipe} button`)
        .then(() => {
          return this.browser.assert.element('.flash-alert');
        })
        .then(done, done);
    });

  })

  describe('Submit New Recipe, Edit Recipe, and Delete Recipe', () => {
    // Load the login page & sign in with testuser@aeropressme.com
    before(function(done) {
      this.browser.visit('/login')
        .then(() => {
          this.browser.fill('#user-email', 'testuser@aeropressme.com');
          this.browser.fill('#password', 'password');
        })
        .then(() => {
          return this.browser.pressButton('button');
        })
        .then(done, done);
    });

    //Logout after tests are done for Submitting, editing, and deleting recipe
    after(function(done) {
      this.browser.visit('/login')
      .then(done, done);
    });

    it('should submit a new recipe', function(done) {
      this.browser.visit('/newrecipe')
      .then(() => {
        this.browser.fill('#input-title', faker.lorem.words());
        this.browser.fill('#input-author', `${faker.name.firstName()} ${faker.name.lastName()}`);
        this.browser.choose(generateRecipeOrientation());
        this.browser.fill('#water', faker.random.number(1000, 0));
        this.browser.fill('#coffee', faker.random.number(1000, 0));
        this.browser.fill('#water-temp', faker.random.number(100, 0));
        this.browser.select('#grind-select', generateRecipeGrind());
        this.browser.fill('#instructions', faker.lorem.paragraph())
      })
        .then(() => {
          return this.browser.pressButton('button');
        })
        .then(() => {
          return this.browser.assert.element('.recipe-card');
        })
        .then(done, done);
    });

    it('should edit a recipe', function(done) {
      this.browser.visit('/myrecipes')
      .then(() => {
        var link = this.browser.querySelector('.edit-link').href;
        return this.browser.visit(link);
      })
      .then(() => {
        return this.browser.fill('#title-edit', 'new title');
      })
      .then(() => {
        return this.browser.pressButton('✍️ Submit Edit');
      })
      .then(() => {
        return assert.equal(this.browser.text('.recipe-title'), 'new title')
      })
      .then(done, done);
    });

    it('should delete a recipe', function(done) {
      this.browser.visit('/myrecipes')
      .then(() => {
        var link = this.browser.querySelector('.edit-link').href;
        return this.browser.visit(link);
      })
      .then(() => {
        // ZombieJS does not support the formaction attribute on the delete button so
        // reset the form action to be that of the formaction from the delete button then
        // press the submit edit button to execute delete
        var deleteAction = this.browser.querySelector('button[name="delete-button"]').getAttribute('formaction');
        this.browser.querySelector('.recipe-form').setAttribute('action', deleteAction)
        return this.browser.pressButton('✍️ Submit Edit');
      })
      .then(() => {
        return this.browser.assert.element('.no-recipes');
      })
      .then(done, done);
    });


  })


});
