'use strict';

const express = require('express');

const cookieParser = require('cookie-parser');
const { hasToken, isLoggedIn, isAdministrator } = require('./access');
const Producer = require('../models/Producer.js');

const router = express.Router();

router.use(cookieParser());

let producers = new Producer();

/**
 * @api {get} /producers List all producers
 * @apiVersion 1.0.0
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
    } ]
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

/**
 * @api {get} /producers/:id List all producer's coffees
 * @apiVersion 1.0.0
 * @apiGroup Producers
 * @apiSuccess {Object[]} producers Producers Coffee list
 * @apiSuccess {Number} producersId Producer id
 * @apiSuccess {String} producer Producer name
 * @apiSuccess {Number} coffeeId Coffee id
 * @apiSuccess {String} coffee Coffee name
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [ {
        "producerId": 1
        "producer": "Blue Bottle Coffee",
        "coffeeId": 4,
        "coffee": "Colombia Popayán Fall Harvest",
    } ]
 * @apiErrorExample {json} Producer's Coffee list not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/producers/:id', (req, res) => {
  const id = req.params.id;
  producers.getProducerById(id)
    .then((producer) => {
      if (producer.length === 0) {
        res.sendStatus(404);
        return;
      }
      res.send(producer);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
})

/**
 * @api {post} /producers/ Add a producer
 * @apiVersion 1.0.0
 * @apiGroup Producers
 * @apiSuccess {Object} producer Producer added
 * @apiSuccess {Number} producers.id Producer id
 * @apiSuccess {String} producer.name Producer name
 * @apiSuccess {Number} country_id Country id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
        "id": 1
        "name": "Blue Bottle Coffee",
        "country_id": 1,
      }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/producers', hasToken, isLoggedIn, (req, res) => {
  const producerToAdd = req.body;

  if (!producerToAdd.name) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('Name required');
  }

  if (!producerToAdd.country_id) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('Counntry ID required');
  }

  producers.addProducer(producerToAdd)
    .then((result) => {
      res.json(result);
    })
    .catch(err => {
      res.sendStatus(500);
    });

});

/**
 * @api {post} /producers/id Update a producer
 * @apiVersion 1.0.0
 * @apiGroup Producers
 * @apiSuccess {Object} producer Producer updated
 * @apiSuccess {Number} producers.id Producer id
 * @apiSuccess {String} producer.name Producer name
 * @apiSuccess {Number} country_id Country id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
        "id": 1
        "name": "Blue Bottle Coffee",
        "country_id": 1,
      }
 * @apiErrorExample {json} Producer not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/producers/:id', hasToken, isLoggedIn, (req, res) => {
  const id = req.params.id;
  const producerToUpdate = req.body;

  if (isNaN(id) || id <= 0) {
    return res.sendStatus(404);
  }

  producers.updateProducer(id, producerToUpdate)
    .then((result) => {
      if (!result) {
        return res.sendStatus(404);
      }
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500);
    })
})

module.exports = router;
