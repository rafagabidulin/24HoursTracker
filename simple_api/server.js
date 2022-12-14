const express = require('express');
const api = require('./api');
const bodyParser = require('body-parser');
const port = 3001;

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.json());
app.use('/api', api);

app.listen(port, 'localhost', function (error) {
  if (error) {
    console.log(error);
    return;
  }

  console.log('Listening at http://localhost:' + port);
});
