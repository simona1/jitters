'use strict';

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('public'));

const countries = require('./src/routes/countries');
const regions = require('./src/routes/regions');
const producers = require('./src/routes/producers');
const coffee = require('./src/routes/coffee');

app.use(countries);
app.use(regions);
app.use(producers);
app.use(coffee);

app.use((req, res) => {
  res.sendStatus(404);
});

let port = process.env.PORT || 8000;

if (app.get('env') === 'test') { port = 8080; }

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
