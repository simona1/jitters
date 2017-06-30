'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');

const Coffee = require('../models/Coffee.js');

const router = express.Router();

const coffeeList = new Coffee();

/**
 * @api {get} /coffee List all coffee types
 * @apiVersion 1.0.0
 * @apiGroup Coffee
 * @apiParam {Number} id Coffee id
 * @apiSuccess {Object[]} coffee Coffee list
 * @apiSuccess {Number} id Coffee id
 * @apiSuccess {Number} producerId Coffee profucer id
 * @apiSuccess {String} name Coffee name
 * @apiSuccess {String} description Coffee description
 * @apiSuccess {String} flavorProfile Coffee flavor profile
 * @apiSuccess {String} varieties Coffee varieties
 * @apiSuccess {Date} created_at Created date
 * @apiSuccess {Date} updated_at Updated date
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *    [{
        "createdAt": "2017-06-23T14:56:16.000Z",
        "description": "Lorem ipsum",
        "flavorProfile": "Fruity, radiant, creamy",
        "id": 1,
        "name": "Three Africas",
        "producerId": 1,
        "updatedAt": "2017-06-23T14:56:16.000Z",
        "varieties": "Heirloom"
      }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/coffee', (req, res) => {
  coffeeList.getCoffee()
    .then(coffeeList => {
      res.send(coffeeList);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/**
 * @api {get} /coffee/:id Get coffee by id
 * @apiVersion 1.0.0
 * @apiGroup Coffee
 *
 * @apiParam {Number} id Coffee unique id
 *
 * @apiSuccess {Object[]} coffee Coffee object
 * @apiSuccess {Number} id Coffee id
 * @apiSuccess {Number} producerId Coffee profucer id
 * @apiSuccess {String} name Coffee name
 * @apiSuccess {String} description Coffee description
 * @apiSuccess {String} flavorProfile Coffee flavor profile
 * @apiSuccess {String} varieties Coffee varieties
 * @apiSuccess {Date} createdAt Created date
 * @apiSuccess {Date} updatedAt Updated date
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *    {
        "createdAt": "2017-06-23T14:56:16.000Z",
        "description": "Lorem ipsum",
        "flavorProfile": "Fruity, radiant, creamy",
        "id": 1,
        "name": "Three Africas",
        "producerId": 1,
        "updatedAt": "2017-06-23T14:56:16.000Z",
        "varieties": "Heirloom"
      }
* @apiErrorExample {json} Coffee object not found
*    HTTP/1.1 404 Not Found
* @apiErrorExample {json} Find error
*    HTTP/1.1 500 Internal Server Error
*/
router.get('/coffee/:id', (req, res) => {
  const id = req.params.id;
  coffeeList.getCoffeeById(id)
    .then(coffee => {
      if (!coffee || coffeeList.length === 0) {
         res.sendStatus(404);
         return;
      }
      res.send(coffee);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/**
 * @api {post} /coffee Add new coffee item
 * @apiVersion 1.0.0
 * @apiGroup Coffee
 * @apiParam {String} producerId Coffee producer id
 * @apiParam {String} name Coffee name
 * @apiParam {String} flavorProfile Coffee flavor profile
 * @apiParam {String} varieties Coffee varieties
 * @apiParam {String} description Coffee description
 * @apiParamExample {json} Input
 *    {
 *      "producerId": "2",
        "name": "Ethiopia Bulga",
        "flavorProfile": "Cotton Candy, Strawberry, Sugar, Tangerine",
        "varieties": "Heirloom",
        "description": "delicious"
 *    }
 * @apiSuccess {Number} id Coffee id
 * @apiParam {String} producerId Coffee producer id
 * @apiParam {String} name Coffee name
 * @apiParam {String} flavorProfile Coffee flavor profile
 * @apiParam {String} varieties Coffee varieties
 * @apiParam {String} description Coffee description
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 2,
 *      "producer_id": "2",
        "name": "Ethiopia Bulga",
        "flavor_profile": "Cotton Candy, Strawberry, Sugar, Tangerine",
        "varieties": "Heirloom",
        "description": "delicious"
 *    }
 * @apiErrorExample {json} Missing fields error
 *    Coffee name required
 *    HTTP/1.1 400 Bad Request Error
 * @apiErrorExample {json} Add error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/coffee', (req, res) => {
  const coffee = req.body;

  if (!coffee.name) {
    return res.status(400)
      .set('Content-Type', 'text/plain')
      .send('Coffee name required');
  }

  coffeeList.addCoffee(coffee)
  .then(coffee => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(coffee[0]);
  })
    .catch(err => {
      res.sendStatus(500);
    });
});

/**
 * @api {post} /coffee/region Add a region to coffee
 * @apiVersion 1.0.0
 * @apiGroup Coffee
 * @apiParam {String} coffeeId Coffee id
 * @apiParam {String} regionId Region id
 * @apiParamExample {json} Input
 *    {
 *      "coffeeId": "2",
 *      "regionId": "3",
 *    }
 * @apiSuccess {Number} id coffee_regions id
 * @apiSuccess {String} coffeeId Coffee id
 * @apiSuccess {String} regionId Region id
 * @apiSuccess {String} createdAt Created Date
 * @apiSuccess {String} varieties Updated Date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
 *    "id": 8,
 *    "coffeeId": 2,
 *    "regionId": 3,
 *    "createdAt": "2017-06-29T15:06:12.003Z",
 *    "updatedAt": "2017-06-29T15:06:12.003Z"
 *  }
 * @apiErrorExample {json} Add error
 *    HTTP/1.1 400 Bad Request Error
 * @apiErrorExample {json} Add error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/coffee/region', (req, res) => {
  const coffeeId = req.body.coffeeId;
  const regionId = req.body.regionId;

  coffeeList.getCoffeeAndRegionIds(coffeeId, regionId)
    .then((ids) => {
      if (!ids) {
        res.send(400);
        return;
      }
      coffeeList.addCoffeeAndRegionIds(req.body)
        .then((result) => {
          res.send(result);
        })
    })
})

/**
 * @api {post} /coffee/:id Update coffee
 * @apiVersion 1.0.0
 * @apiGroup Coffee
 *
 * @apiParam {Number} id Coffee unique id
 *
 * @apiParam {String} producerId Coffee producer id
 * @apiParam {String} name Coffee name
 * @apiParam {String} flavorProfile Coffee flavor profile
 * @apiParam {String} varieties Coffee varieties
 * @apiParam {String} description Coffee description
 * @apiParamExample {json} Input
 *    {
 *      "producerId": "2",
        "name": "Ethiopia Bulga",
        "flavorProfile": "Cotton Candy, Strawberry, Sugar, Tangerine",
        "varieties": "Heirloom",
        "description": "lorem ipsum"
 *    }
 * @apiSuccess {Number} id Coffee id
 * @apiParam {String} producerId Coffee producer id
 * @apiParam {String} name Coffee name
 * @apiParam {String} flavorProfile Coffee flavor_profile
 * @apiParam {String} varieties Coffee varieties
 * @apiParam {String} description Coffee description
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 2,
 *      "producerId": "2",
        "name": "Ethiopia Bulga",
        "flavorProfile": "Cotton Candy, Strawberry, Sugar, Tangerine",
        "varieties": "Heirloom",
        "description": "delicious"
 *    }
 * @apiErrorExample {json} Add error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/coffee/:id', (req, res) => {
  const coffee = req.body;
  coffee.id = req.params.id;

  if (!coffee.name) {
    return res.status(400)
      .set('Content-Type', 'text/plain')
      .send('Coffee name required');
  }

  coffeeList.updateCoffee(coffee)
  .then(coffee => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(coffee[0]);
  })
    .catch(err => {
      res.sendStatus(500);
    });
});

/**
 * @api {delete} /coffee/:id Delete coffee
 * @apiVersion 1.0.0
 * @apiGroup Coffee
 *
 * @apiParam {Number} id Coffee unique id
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 2,
 *      "producerId": "2",
        "name": "Ethiopia Bulga",
        "flavorProfile": "Cotton Candy, Strawberry, Sugar, Tangerine",
        "varieties": "Heirloom",
        "description": "Lorem ipsum"
 *    }
 * @apiErrorExample {json} Invalid coffee id
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/coffee/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(404);
  }

  coffeeList.deleteCoffee(id)
  .then(deletedCoffee => {
    if (!deletedCoffee[0]) {
        res.sendStatus(404);
      }
    res.send(deletedCoffee)
  })
  .catch(err => {
      res.status(500).send(err);
  });
})

module.exports = router;
