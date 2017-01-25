# AeroPressME ☕️ [![Build Status](https://travis-ci.org/bvellek/aeropress-me-app.svg?branch=master)](https://travis-ci.org/bvellek/aeropress-me-app)

[AeroPressME](https://aeropress-me-app.herokuapp.com) is a full-stack web application designed to help the AeroPress community share recipes and rank the best ones.


## Usage

Clone the repo `https://github.com/bvellek/aeropress-me-app.git` and run `npm install` or `yarn`.

- To run the app locally: `mongod` and in another terminal tab/window `node server.js`. Open browser to `localhost:8080`.
- To run the tests: `npm test`.
- To run build: `grunt build`.


## Project Summary

AeroPressME is a web application that I designed and developed to help the AeroPress community share recipes/methods. It is designed to allow users to discover new recipes for brewing coffee with the AeroPress. AeroPressME also allows users to see all of the recipes ranked using an upvote feature.

## Screenshots 📷

| <img alt="Landing Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-landing.jpg?raw=true" width="350"> | <img alt="Login Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-login.jpg?raw=true" width="350"> | <img alt="Registration Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-registration.jpg?raw=true" width="350"> |
|:---:|:---:|:---:|
| Landing Page | Login Page | Registration Page |


| <img alt="My Recipes Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-myrecipes.jpg?raw=true" width="350"> | <img alt="All Recipes Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-allrecipes.jpg?raw=true" width="350"> | <img alt="New Recipe Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-newrecipe.jpg?raw=true" width="350"> | <img alt="Edit Recipe Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-edit.jpg?raw=true" width="350"> |
|:---:|:---:|:---:|:---:|
| My Recipes | Top Recipes | New Recipe | Edit Recipe |


## Design and Development Process

| ![User Flow Diagram](https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/UserFlow.jpg?raw=true) |
|:---:|
| User Flow Diagram |

In the design phase of this application, I started by writing user stories to determine what the user should and shouldn't be able to do. The primary user features are to view ranked recipes, add recipes, edit recipes, delete recipes, and upvote recipes. With these features in mind, I decided it would be important to add user authentication to prevent users from editing/deleting each other's recipes, but still offer a public landing page with all the ranked recipes for those who do not wish to signup. I then created a user flow diagram to map the possible routes through the application. I also created prototypes in [Sketch](https://www.sketchapp.com/) to visualize the final product.

In the development phase of this application, I followed a strategy of progressive enhancement with a RESTful architecture. I started with an HTML first approach, which enabled me to discover what aspects could be enhanced by adding client-side JavaScript. All functionality of the application is usable with client-side JavaScript disabled, however I discovered the primary enhancement of enabling client-side JavaScript would be asynchronous upvoting of recipes. This enhances the user experience because it no longer relies on form posts that require a refresh of the page after each vote. I also developed this application with automated testing for all of the user endpoints to allow for simple modifications.
Accessibility?


## Tech Used

### Front-End

 - HTML5
 - CSS3
 - JavaScript

### Back-End

 - [Node](https://nodejs.org)
 - [Express](https://expressjs.com/)
 - [Pug Template Engine](https://pugjs.org)
 - [MongoDB](https://www.mongodb.com/)
 - [Mongoose ODM](http://mongoosejs.com/)
 - [Passport](http://passportjs.org/) - middleware for local and OAuth2.0 authentication
 - [Bcrypt](https://www.npmjs.com/package/bcrypt) - middleware for password hashing

### Testing and Deployment
 - [Mocha](https://mochajs.org/) - testing framework
 - [Zombie](http://zombie.js.org/) - headless browser for testing
 - [Chai](http://chaijs.com/) - assertion library for Node
 - [Faker](https://www.npmjs.com/package/Faker) - generate fake contextual data for tests
 - [Travis CI](https://travis-ci.org/) - continuous integration service
 - [Heroku](https://www.heroku.com/) - cloud PaaS
 - [mLab](https://mlab.com/) - cloud database service
 - [Grunt](http://gruntjs.com/) - task runner


## Future Improvements
There are a number of enhancements and features that are in consideration for future versions of AeroPressME. These include automated 'forgot password' support, pagination of recipes, and additional sorting features.
