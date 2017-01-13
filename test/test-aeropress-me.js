const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const should = chai.should();

const Recipe = require('../models/recipe');
const User = require('../models/user');
const Vote = require('../models/vote');
const {app, runServer, closeServer} = require('../server');

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

  it('should show HTML', function(done) {
    this.timeout(5000)
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        console.log(err, res);
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
});
