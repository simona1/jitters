'use strict';

const express = require('express');

const cookieParser = require('cookie-parser');
const { hasToken, isLoggedIn, isAdministrator } = require('./access.js');
const Producer = require('../models/Producer.js');

const router = express.Router();

router.use(cookieParser());

let producers = new Producer();

/**
 * @api {get} /producers List all producers
 * @apiVersion 1.0.0
 * @apiGroup Producers
 * @apiSuccess {Object[]} producers Producers list
 * @apiSuccess {Number} id Producer id
 * @apiSuccess {String} name Producer name
 * @apiSuccess {Number} countryId Producer's Country
 * @apiSuccess {Date} createdAt Created date
 * @apiSuccess {Date} updatedAt Updated date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [ {
        "id": 1,
        "name": "Blue Bottle Coffee",
        "countryId": 1,
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
 * @apiParam {Number} id Producer's id
 * @apiSuccess {Object[]} producers Producer's Coffee list
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
 * @apiParam {Number} id Producer id
 * @apiParam {String} name Producer name
 * @apiParam {Number} countryId Country id
 * @apiParamExample {json} Input
 *    {
 *      "id": 1
 *      "name": "Blue Bottle Coffee",
 *      "countryId": 1,
 *    }
 * @apiSuccess {Object} producer Producer added
 * @apiSuccess {Number} id Producer id
 * @apiSuccess {String} name Producer name
 * @apiSuccess {Number} countryId Country id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1
 *      "name": "Blue Bottle Coffee",
 *      "countryId": 1,
 *    }
 * @apiErrorExample {String} Name error
 *    HTTP/1.1 400 Name required
 * @apiErrorExample {String} Country id error
 *    HTTP/1.1 400 Country id required
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
 * @apiParam {Number} id Producer's id
 * @apiSuccess {Object} producer Producer updated
 * @apiSuccess {Number} id Producer id
 * @apiSuccess {String} name Producer name
 * @apiSuccess {Number} countryId Country id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1
 *      "name": "Blue Bottle Coffee",
 *      "countryId": 1,
 *    }
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
