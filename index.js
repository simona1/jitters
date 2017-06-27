'use strict';

const express = require('express');

const app = express();

const countries = require('./src/routes/countries');
const regions = require('./src/routes/regions');


app.use(countries);
app.use(regions);

app.use((req, res) => {
  res.sendStatus(404);
});

let port = process.env.PORT || 8000;

if (app.get('env') === 'test') { port = 8080; }

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
