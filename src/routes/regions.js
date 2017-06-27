'use strict';

const express = require('express');
const humps = require('humps');

const Region = require('../models/Region.js');

const router = express.Router();

let regions = new Region();


router.get('/regions', (req, res) => {
  regions.getRegions()
    .then(regions => {
      res.send(regions);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/regions/:id', (req, res) => {
  console.log('this');

  const id = req.params.id;
  regions.getCoffeeByRegionId(id)
    .then(region => {
      res.send(region);
    })
    .catch(err => {
      res.status(500).send(err);
  });
});

router.post('/regions', (req, res) => {
  let region = req.body;
  console.log(region);


  if (!undefined.name) {
    res.set('Content-Type','text/plain');
    res.status(400).send('Region must have a name');
    return;
  }

  let coordinates = getGpsCoordinates(region.name)
  region.lat = coordinates.lat;
  region.long = coordinates.long;

    regions.addRegion(region)
    .then(region => {
      res.setHeader('Content-Type', 'application/json')
      console.log(region);
      return res.send(region[0]);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

module.exports = router;
