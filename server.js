const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = {app};
