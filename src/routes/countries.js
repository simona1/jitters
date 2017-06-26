'use strict';

const express = require('express');
const humps = require('humps');

const Country = require('../models/Country.js');

const router = express.Router();

router.get('/countries', (req, res) => {
  let countries = new Country();

  countries.getCountries()
    .then(countries => {
      res.send(countries);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
