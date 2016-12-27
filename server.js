const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const app = express();






app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = {app};




app.use(express.static('public'));
app.listen(process.env.PORT || 8080);
