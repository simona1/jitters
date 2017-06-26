'use strict';

const express = require('express');
const humps = require('humps');

const Country = require('../models/Country.js');

const router = express.Router();

let countries = new Country();

/**
 * @api {get} /countries List all countries
 * @apiGroup Countries
 * @apiSuccess {Object[]} countries Country's list
 * @apiSuccess {Number} countries.id Country id
 * @apiSuccess {String} countries.name Country name
 * @apiSuccess {String} countries.lat Country latitude
 * @apiSuccess {String} countries.long Country longitude
 * @apiSuccess {Date} countries.created_at Created date
 * @apiSuccess {Date} countries.updated_at Update date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [ {
        "id": 2,
        "name": "Ethiopia",
        "lat": "9.1450000",
        "long": "40.4896730",
        "createdAt": "2017-06-23T14:56:16.000Z",
        "updatedAt": "2017-06-23T14:56:16.000Z"
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/countries', (req, res) => {
  countries.getCountries()
    .then(countries => {
      res.send(countries);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/countries/:id', (req, res) => {
  const id = req.params.id;
  countries.getCoffeeByCountryId(id)
    .then(country => {
      res.send(country);
    })
    .catch(err => {
      res.status(500).send(err);
  });
});

module.exports = router;
