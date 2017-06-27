'use strict';

const express = require('express');

const Producer = require('../models/Producer.js');

const router = express.Router();

let producers = new Producer;

/**
 * @api {get} /producers List all producers
 
 * @apiGroup Producers
 * @apiSuccess {Object[]} producers Producers list
 * @apiSuccess {Number} producers.id Producer id
 * @apiSuccess {String} producers.name Producer name
 * @apiSuccess {Date} producers.created_at Created date
 * @apiSuccess {Date} producers.updated_at Updated date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [ {
        "id": 1,
        "name": "Blue Bottle Coffee",
        "country_id": 1,
        "createdAt": "2017-06-23T14:56:16.000Z",
        "updatedAt": "2017-06-23T14:56:16.000Z"
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/producers', (req, res) => {
  producers.getProducers()
    .then((producers) => {
      res.send(producers);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
