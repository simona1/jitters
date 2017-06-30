'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const jwt = require('jsonwebtoken');
const Favorite = require('../models/Favorite.js');
const { hasToken, isLoggedIn, isAdministrator } = require('./access.js');

const router = express.Router();

const favorite = new Favorite();

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
    .then(coffee => {
      res.setHeader('Content-Type', 'application/json')
      return res.send(coffee[0]);
    })
      .catch(err => {
        res.sendStatus(500);
      });
  });

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

  // router.delete('/favorites/:id', hasToken, isLoggedIn, (req, res) => {
  //   const id = req.params.id;
  //   console.log(id);
  //
  //   if (isNaN(id)) {
  //     return res.sendStatus(404);
  //   }
  //
  //   favorite.deleteFavorite(id)
  //   .then(deletedFavorite => {
  //     if (!deletedFavorite[0]) {
  //         res.sendStatus(404);
  //         return;
  //       }
  //     res.send(deletedFavorite)
  //   })
  //   .catch(err => {
  //       res.status(500).send(err);
  //   });
  // });





  module.exports = router;
