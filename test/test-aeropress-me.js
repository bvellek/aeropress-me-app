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


const should = chai.should();
const expect = chai.expect;
chai.use(chaiHTTP);



// const {app, runServer, closeServer} = require('../server');
// const chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);





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
    title: faker.lorem.sentence(),
    author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    orientation: generateRecipeOrientation(),
    massWater: faker.random.number(),
    massCoffee: faker.random.number(),
    waterTemp: faker.random.number(),
    grind: generateRecipeGrind(),
    instructions: faker.lorem.paragraph()
  };
}

function tearDownDb() {
  console.warn('Deleting DB');
  return mongoose.connection.dropDatabase();
}





describe('HTML', function() {


  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should show HTML', () => {
    const resolvingPromise = new Promise((resolve, reject) => {
      chai.request(app)
        .get('/')
        .end(function(err, res) {
          console.log(err, res);
          res.should.have.status(200);
          res.should.be.html;
          resolve('it resolved');
        });
    });
    return resolvingPromise.then( (result) => {
      expect(result).to.equal('it resolved');
    })
  });


});
