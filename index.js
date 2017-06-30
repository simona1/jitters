'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join('public')));


const countries = require('./src/routes/countries');
const regions = require('./src/routes/regions');
const producers = require('./src/routes/producers');
const coffee = require('./src/routes/coffee');
const users = require('./src/routes/users');
const login = require('./src/routes/login');
const favorite = require('./src/routes/favorites');

app.use(countries);
app.use(regions);
app.use(producers);
app.use(coffee);
app.use(users);
app.use(login);
app.use(favorite);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((_req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});


let port = process.env.PORT || 8000;

if (app.get('env') === 'test') { port = 8080; }

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
