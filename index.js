'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(express.static('public'));

const countries = require('./src/routes/countries');
const regions = require('./src/routes/regions');
const producers = require('./src/routes/producers');
const coffee = require('./src/routes/coffee');
const users = require('./src/routes/users');
const login = require('./src/routes/login');

app.use(countries);
app.use(regions);
app.use(producers);
app.use(coffee);
app.use(users);
app.use(login);

app.use((req, res) => {
  res.sendStatus(404);
});

let port = process.env.PORT || 8000;

if (app.get('env') === 'test') { port = 8080; }

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
