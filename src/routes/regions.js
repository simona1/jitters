'use strict';

const express = require('express');
const gmsApiKey = process.env.GMS_API_KEY;
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
 * @apiSuccess {Number} id Region id
 * @apiSuccess {String} name Region name
 * @apiSuccess {String} lat Region latitude
 * @apiSuccess {String} long Region longitude
 * @apiSuccess {Date} Created date
 * @apiSuccess {Date} Updated date
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
 *
 * @apiParam {Number} id Regions unique id
 *
 * @apiSuccess {Object[]} coffee Coffee list
 * @apiSuccess {Number} id Coffee id
 * @apiSuccess {Number} producerId Coffee profucer id
 * @apiSuccess {String} name Coffee name
 * @apiSuccess {String} description Coffee description
 * @apiSuccess {String} flavorProfile Coffee flavor profile
 * @apiSuccess {String} varieties Coffee varieties
 * @apiSuccess {String} regionName Region name
 * @apiSuccess {String} lat Region latitude
 * @apiSuccess {String} long Region longitude
 * @apiSuccess {Date} Created date
 * @apiSuccess {Date} Updated date
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

  if (isNaN(id)) {
  return res.sendStatus(404);
}

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
 * @apiParam {String} countryId Country id
 * @apiParam {String} name Region name
 * @apiParamExample {json} Input
 *    {
 *      "country_id": "1",
        "name": "kona"
 *    }
 * @apiSuccess {Number} id Region id
 * @apiParam {String} countryId Country id
 * @apiParam {String} name Region name
 * @apiSuccess {String} lat Region latitude
 * @apiSuccess {String} long Region longitude
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "countryId": 1,
 *      "name": "kona",
 *      "lat": "19.639994",
 *      "long": "-155.9969261",
 *    }
 * @apiErrorExample {json} Missing fields
 *    HTTP/1.1 400 Bad request
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

fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${region.name}&key=${gmsApiKey}`)
        .then(response => {
         return response.json()
     })
      .then(data => {
        if ((data.results.length !== 1) && (!region.lat || !region.long)) {
          region.lat = null;
          region.long = null;
        };
          if ((!region.lat || !region.long) && (region.lat !== null || region.long !== null)) {
            region.lat = data.results[0].geometry.location.lat;
            region.long = data.results[0].geometry.location.lng;
          }
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

/**
 * @api {post} /regions/:id Update a region
 * @apiGroup Regions
 *
 * @apiParam {Number} id Regions unique id
 *
 * @apiParam {String} country_id Region country_id
 * @apiParam {String} name Region name
 * @apiParamExample {json} Input
 *    {
 *      "country_id": "2",
        "name": "kauai"
 *    }
 * @apiSuccess {Number} id Region id
 * @apiParam {String} country_id Region country_id
 * @apiParam {String} name Region name
 * @apiSuccess {String} regions.lat Region latitude
 * @apiSuccess {String} regions.long Region longitude
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 2,
 *      "countryId": 2,
 *      "name": "auai",
 *      "lat": "22.0964396",
 *      "long": "-159.5261238",
 *    }
 * @apiErrorExample {json} Missing fields
 *    HTTP/1.1 400 Bad request
 * @apiErrorExample {json} Add error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/regions/:id', (req, res) => {
  let region = req.body;
  region.id = req.params.id;

  if (!region.name) {
    res.set('Content-Type','text/plain');
    res.status(400).send('Region must have a name');
    return;
  }

fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${region.name}&key=${gmsApiKey}`)
        .then(response => {
         return response.json()
     })
      .then(data => {
        if (data.results.length !== 1 && (!region.lat || !region.long)) {
          region.lat = null;
          region.long = null;
        };
          if ((!region.lat || !region.long) && (region.lat !== null || region.long !== null)) {
            region.lat = data.results[0].geometry.location.lat;
            region.long = data.results[0].geometry.location.lng;
          }
          regions.updateRegion(region)
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
