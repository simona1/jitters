'use strict';

const express = require('express');
const humps = require('humps');

const Country = require('../models/Country.js');

const router = express.Router();

let countries = new Country();

/**
 * @api {get} /countries List all countries
 * @apiVersion 1.0.0
 * @apiGroup Countries
 * @apiSuccess {Object[]} countries Countries list
 * @apiSuccess {Number} id Country id
 * @apiSuccess {String} name Country name
 * @apiSuccess {String} lat Country latitude
 * @apiSuccess {String} long Country longitude
 * @apiSuccess {Date} createdAt Created date
 * @apiSuccess {Date} updatedAt Updated date
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
 * @apiErrorExample {json} Countries list not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/countries', (req, res) => {
  countries.getCountries()
    .then(countries => {
      if (!countries) {
        res.sendStatus(404);
        return;
      }
      res.send(countries);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/**
 * @api {get} /countries/:id Find coffee by country id
 * @apiVersion 1.0.0
 * @apiGroup Countries
 *
 * @apiParam {Number} id Country unique id
 *
 * @apiSuccess {Object[]} coffee Coffee list
 * @apiSuccess {Number} id Coffee id
 * @apiSuccess {Number} producerId Coffee producer id
 * @apiSuccess {String} name Coffee name
 * @apiSuccess {String} description Coffee description
 * @apiSuccess {String} flavorProfile Coffee flavor profile
 * @apiSuccess {String} varieties Coffee varieties
 * @apiSuccess {String} countryName Country name
 * @apiSuccess {String} regionName Region name
 * @apiSuccess {String} lat Region latitude
 * @apiSuccess {String} long Region longitude
 * @apiSuccess {Date} regions Created date
 * @apiSuccess {Date} regions Updated date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "countryName": "Ethiopia",
        "description": "Lorem ipsum",
        "flavorProfile": "Fruity, radiant, creamy",
        "id": 1,
        "lat": 6.16205,
        "long": 38.2058,
        "name": "Three Africas",
        "producerId": 1,
        "regionName": "Yirgacheffe",
        "varieties": "Heirloom"
    }]
 * @apiErrorExample {json} Coffee list not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/countries/:id', (req, res) => {
  const id = req.params.id;
  countries.getCoffeeByCountryId(id)
    .then((coffeeList) => {
      if (coffeeList.length === 0) {
        res.sendStatus(404);
        return;
      }
      res.send(coffeeList);
    })
    .catch(err => {
      res.status(500).send(err);
  });
});

module.exports = router;
