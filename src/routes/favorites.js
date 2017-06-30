'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const jwt = require('jsonwebtoken');
const Favorite = require('../models/Favorite.js');
const { hasToken, isLoggedIn, isAdministrator } = require('./access.js');

const router = express.Router();

const favorite = new Favorite();

/**
* @api {get} /favorites/:id Get all favorites by user id
* @apiVersion 1.0.0
* @apiGroup Favorites
*
* @apiParam {Number} id Favorite unique id
* @apiSuccess {Object[]} coffee Favorites list
* @apiSuccess {Number} id Coffee id
* @apiSuccess {String} description Coffee description
* @apiSuccess {String} flavorProfile Coffee flavor profile
* @apiSuccessExample {json} Success
*  HTTP/1.1 200 OK
*    [{
      "coffeeId": 1,
      "description": "Lorem ipsum",
      "flavorProfile": "Fruity, radiant, creamy",
      "name": "Three Africas",
    }]
* @apiErrorExample {json} List error
*    HTTP/1.1 500 Internal Server Error
*/
router.get('/favorites/:id', hasToken, isLoggedIn, (req,res) => {
  let id = req.params.id;

  favorite.getAllFavoritesByUserId(id)
    .then(favorites => {
      res.send(favorites);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  });

/**
 * @api {post} /favorites Add a new favorite
 * @apiVersion 1.0.0
 * @apiGroup Favorites
 * @apiParam {Number} id Favorite unique id
 * @apiParam {number} userId Favorite user id
 * @apiParam {number} coffeeId Favorite coffee id
 * @apiParamExample {json} Input
 *    {
 *      "userId": "1",
 *      "coffeeId": "2"
 *    }
 * @apiSuccess {Number} id Favorite id
 * @apiParam {number} userId Favorite user id
 * @apiParam {number} coffeeId Favorite coffee id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 'id',
 *      "userId": "1",
 *      "coffeeId": "2"
 *    }
 * @apiErrorExample {json} Coffee not found
 *    HTTP/1.1 404 Not Found
 @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Add error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/favorites', (req, res) => {
  const newFavorite = req.body;

  if (!newFavorite.coffeeId) {
    return res.status(400)
      .set('Content-Type', 'text/plain')
      .send('Coffee required');
  }

  if (!newFavorite.userId) {
    return res.status(400)
      .set('Content-Type', 'text/plain')
      .send('User ID required');
  }

  favorite.addFavorite(newFavorite)
  .then(newFavorite => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(newFavorite[0]);
  })
    .catch(err => {
      res.sendStatus(500);
    });
});


/**
 * @api {delete} /favorites/:id Delete favorite
 * @apiVersion 1.0.0
 * @apiGroup Favorites
 *
 * @apiParam {Number} id Favorite unique id
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 2,
 *      "coffeeId": "1",
 *      "userId": "1",
 *    }
 * @apiErrorExample {json} Invalid favorite id
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/favorites/:id', hasToken, isLoggedIn, (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.sendStatus(404);
  }

  favorite.deleteFavorite(id)
  .then(deletedFavorite => {
    if (!deletedFavorite[0]) {
        res.sendStatus(404);
        return
      }
    res.send(deletedFavorite)
  })
  .catch(err => {
    res.status(500).send(err);
  });
})


  module.exports = router;
