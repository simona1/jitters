'use strict';

const express = require('express');

const app = express();

app.use(express.static('public'));

const countries = require('./src/routes/countries');

app.use(countries);

app.use((req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
