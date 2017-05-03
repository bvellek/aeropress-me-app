# AeroPressME ☕️ [![Build Status](https://travis-ci.org/bvellek/aeropress-me-app.svg?branch=master)](https://travis-ci.org/bvellek/aeropress-me-app)

[AeroPressME](https://aeropress-me-app.herokuapp.com) is a full-stack web application designed to help the AeroPress coffee community share recipes and rank the best ones.


## Usage 👩‍💻
In order to get started clone this repo. Enter the commands below in your terminal:
```bash
git clone https://github.com/bvellek/aeropress-me-app.git
cd aeropress-me-app
yarn install
```
- __Development__: to run the app locally run `mongod` and in another terminal tab/window run `node server.js`. Open browser to 'localhost:8080'.
- __Build__: to start the build process run `grunt build`. The build process requires [Grunt](http://gruntjs.com/) as a task runner for CSS and JS minification. If you do not already have Grunt CLI installed run `yarn global add grunt-cli`.
- __Testing__: to run the tests run `mongod` and in another terminal tab/window run `yarn test`.



## Project Summary 👍
AeroPressME is a web application that I designed and developed to help the AeroPress community share recipes/methods. It is designed to allow users to discover new recipes for brewing coffee with the AeroPress. AeroPressME also allows users to see all of the recipes ranked using an upvote feature.


## Screenshots 📸
| <img alt="Landing Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-landing.jpg?raw=true" width="350"> | <img alt="Login Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-login.jpg?raw=true" width="350"> | <img alt="Registration Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-registration.jpg?raw=true" width="350"> |
|:---:|:---:|:---:|
| Landing Page | Login Page | Registration Page |


| <img alt="My Recipes Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-myrecipes.jpg?raw=true" width="350"> | <img alt="All Recipes Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-allrecipes.jpg?raw=true" width="350"> | <img alt="New Recipe Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-newrecipe.jpg?raw=true" width="350"> | <img alt="Edit Recipe Page" src="https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-edit.jpg?raw=true" width="350"> |
|:---:|:---:|:---:|:---:|
| My Recipes | Top Recipes | New Recipe | Edit Recipe |


## Design Process 📐
| ![User Flow Diagram](https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/UserFlow.jpg?raw=true) |
|:---:|
| User Flow Diagram |

In the design phase of this application, I started by writing user stories to determine what the user should and shouldn't be able to do. The primary user features are to view ranked recipes, add recipes, edit recipes, delete recipes, and upvote recipes. With these features in mind, I decided it would be important to add user authentication to prevent users from editing/deleting each other's recipes, but still offer a public landing page with all the ranked recipes for those who do not wish to signup. I then created a user flow diagram to map the possible routes through the application. I also created prototypes in [Sketch](https://www.sketchapp.com/) to visualize the final product.


## Development Process 🛠
In the development phase of this application, I followed a strategy of progressive enhancement with a RESTful architecture. I started with an HTML first approach, which enabled me to discover what aspects could be enhanced by adding client-side JavaScript. All functionality of the application is usable with client-side JavaScript disabled, however I discovered the primary enhancement of enabling client-side JavaScript would be asynchronous upvoting of recipes. This enhances the user experience because it no longer relies on form posts that require a refresh of the page after each vote. I also developed this application with automated testing for all of the user endpoints to allow for simple modifications.

### Accessibility 🌏
| ![Screen Reader Accessibility](https://github.com/bvellek/aeropress-me-app/blob/master/public/img/design/screen-desk-voice.jpg?raw=true) |
|:---:|
| Screen Reader Title Context |

Using a progressive enhancement strategy with an HTML first approach and within the constraints of web standards offered an implicit level of accessibility. This application was also tested for screen reader accessibility. Other accessibility improvements:

- WCAG 2.0 Level AA Compliance
- Keyboard Accessibility: `tabindex='0'` attributes were added to recipe titles so that tabbing through the pages was more intuitive.
- VoiceOver Context: as shown in the figure above (highlighted in red) the recipe title was added as context for people using VoiceOver. There are visual cues that imply context so I used a `.visually-hidden` class from the [A11Y Project](http://a11yproject.com/posts/how-to-hide-content/) to maintain visual styles while enhancing the experience for those navigating without sight.
- VoiceOver Rotor: the Rotor is a commonly used feature that allows for more efficient web browsing by listing common elements like headings, links, and images. To maximize this feature I ensured that all pages had proper heading structure.
- Details and Summary Elements: use of the details and summary elements provide interactivity without the use of JavaScript to hide content.
- Emoji: they are accessible to screen readers and also give AeroPress users who don't speak English some context for actions like upvoting recipes 👍. They also do not require any alt text or labels.

### Performance ⚙️
With the majority of tasks running on the server, I was able to keep this application fairly light weight. Emojis offer a nice touch while costing 0kB. In order to keep the application fast and light, I removed all jQuery in favor of vanilla JavaScript. The minified, GZIPed `app.min.js` file is only 530B. The minified, GZIPed `main.min.css` file is only 2.21kB.  I also deferred font loading to keep initial page loads as fast as possible. With JavaScript disabled, I have used system fonts as fallbacks.
```
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('html > head').appendChild((function(){
    const link = document.createElement('link');
    link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Lato:400,700,900%7CMontserrat:700');
    link.setAttribute('rel', 'stylesheet');
    return link
  })());
})
```


## Tech Used 💻
### Front-End

 - HTML5
 - CSS3
 - Vanilla JavaScript

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


## Future Improvements 🚀
There are a number of enhancements and features that are in consideration for future versions of AeroPressME. These include automated 'forgot password' support, pagination of recipes, additional sorting features, offline support, and rich text editing for recipe instructions (to provide ability for ordered lists).
