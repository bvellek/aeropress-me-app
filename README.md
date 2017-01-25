# AeroPressME ☕️ [![Build Status](https://travis-ci.org/bvellek/aeropress-me-app.svg?branch=master)](https://travis-ci.org/bvellek/aeropress-me-app)
[AeroPressME](https://aeropress-me-app.herokuapp.com) is a full-stack web application designed to help the AeroPress community share recipes and rank the best ones.

## Usage
```
$ git clone https://github.com/bvellek/aeropress-me-app.git
$ cd aeropress-me-app
aeropress-me-app $ yarn
aeropress-me-app $ grunt build
```

## Project Summary
AeroPressMe is a web application that I designed and developed to help the AeroPress community share recipes/methods. It is designed to allow users to discover new for brewing  coffee with the Aeropress. AeroPressMe also allows users to see all of the recipes ranked using an upvote feature.

## Screenshots 📷
<img alt="Landing Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-landing.jpg?raw=true" width="350">
<img alt="Login Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-login.jpg?raw=true" width="350">
<img alt="Registration Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-registration.jpg?raw=true" width="350">
<img alt="My Recipes Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-myrecipes.jpg?raw=true" width="350">
<img alt="All Recipes Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-allrecipes.jpg?raw=true" width="350">
<img alt="New Recipe Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-newrecipe.jpg?raw=true" width="350">
<img alt="Edit Recipe Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-edit.jpg?raw=true" width="350">




## Design and Development Process
### User Flow Diagram
![User Flow Diagram](https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/UserFlow.jpg?raw=true)

- Progressive enhancement
- Accessibility
- HTML first design

- Designed with progressive enhancement strategies. It is fully functional with client-side JavaScript turned off. Enabling client-side JavaScript enhances user experience with asynchronous upvoting of recipes.
- This app is fully responsive for mobile, tablet and desktop.
- It utilizes HTML5 form validation and hcard microformats for easy user input.



## Tech Used
### Front-End
 - HTML5
 - CSS3
 - JavaScript

### Back-End
 - Node
 - Express
 - Pug Template Engine
 - MongoDB
 - Mongoose ODM
 - Passport - middleware for local and OAuth2.0 authentication
 - Bcrypt - middleware for password hashing

### Testing and Deployment
 - Mocha test framework
 - Zombie.js - headless browser for testing
 - Chai Assertion Library
 - Faker - generate fake contextual data for tests
 - Travis CI - continuous integration service
 - Heroku - cloud PaaS
 - mLab - cloud database service
 - Grunt - task runner


## Future Improvement
There are a number of enhancements and features that are in consideration for future versions of AeroPressME. These include automated 'forgot password' support, pagination of recipes
