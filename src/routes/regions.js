'use strict';

const express = require('express');
const humps = require('humps');

const Region = require('../models/Region.js');
const fetch = require('node-fetch');
const router = express.Router();

let regions = new Region();


/**
 * @api {get} /regions List all regions
 * @apiVersion 1.0.0
 * @apiGroup Regions
 * @apiSuccess {Object[]} regions Regions list
 * @apiSuccess {Number} regions.id Region id
 * @apiSuccess {String} regions.name Region name
 * @apiSuccess {String} regions.lat Region latitude
 * @apiSuccess {String} regions.long Region longitude
 * @apiSuccess {Date} regions.created_at Created date
 * @apiSuccess {Date} regions.updated_at Update date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [ {
        "id": 1,
        "name": "Yirgacheffe",
        "lat": "6.1620450",
        "long": "38.2058150",
        "createdAt": "2017-06-23T14:56:16.000Z",
        "updatedAt": "2017-06-23T14:56:16.000Z"
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/regions', (req, res) => {
  regions.getRegions()
    .then(regions => {
      res.send(regions);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/**
 * @api {get} /regions/:id Find coffee by region id
 * @apiVersion 1.0.0
 * @apiGroup Regions
 * @apiSuccess {Object[]} coffee Coffee list
 * @apiSuccess {Number} coffee.id Coffee id
 * @apiSuccess {Number} coffee.producer_id Coffee profucer id
 * @apiSuccess {String} coffee.name Coffee name
 * @apiSuccess {String} coffee.description Coffee description
 * @apiSuccess {String} coffee.flavor_profile Coffee flavor profile
 * @apiSuccess {String} coffee.varieties Coffee varieties
 * @apiSuccess {String} region.name Region name
 * @apiSuccess {String} regions.name Region name
 * @apiSuccess {String} regions.lat Region latitude
 * @apiSuccess {String} regions.long Region longitude
 * @apiSuccess {Date} regions.created_at Created date
 * @apiSuccess {Date} regions.updated_at Update date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "countryName": "Ethiopia",
        "description": "Lorem ipsum",
        "flavorProfile": "Fruity, radiant, creamy",
        "id": 1,
        "lat": "6.1620450",
        "long": "38.2058150",
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
router.get('/regions/:id', (req, res) => {

  const id = req.params.id;
  regions.getCoffeeByRegionId(id)
    .then(region => {
      res.send(region);
    })
    .catch(err => {
      res.status(500).send(err);
  });
});



/**
 * @api {post} /regions Add a new region
 * @apiGroup Regions
 * @apiParam {String} country_id Region country_id
 * @apiParam {String} name Region name
 * @apiParamExample {json} Input
 *    {
 *      "country_id": "1",
        "name": "kona"
 *    }
 * @apiSuccess {Number} id Region id
 * @apiParam {String} country_id Region country_id
 * @apiParam {String} name Region name
 * @apiSuccess {String} regions.lat Region latitude
 * @apiSuccess {String} regions.long Region longitude
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "countryId": 1,
 *      "name": "kona",
 *      "lat": "19.639994",
 *      "long": "-155.9969261",
 *    }
 * @apiErrorExample {json} Add error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/regions', (req, res) => {
  let region = req.body;

  if (!region.name) {
    res.set('Content-Type','text/plain');
    res.status(400).send('Region must have a name');
    return;
  }

fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${region.name}`)
        .then(response => {
         return response.json()
     })
      .then(data => {
        if (data.results.length !== 1) {
          res.sendStatus(404);
          return
          };
          region.lat = data.results[0].geometry.location.lat;
          region.long = data.results[0].geometry.location.lng;
          regions.addRegion(region)
          .then(region => {
            res.setHeader('Content-Type', 'application/json')
            return res.send(region[0]);
          })
          .catch(err => {
            res.sendStatus(500);
      });
    })
    .catch(err => {
      console.log(err);
    })
});

module.exports = router;
