'use strict';

const bcrypt = require( 'bcrypt' );
const bodyParser = require( 'body-parser' );
const express = require('express');
const humps = require('humps');


const User = require('../models/User.js');
const saltRounds = 10;


const router = express.Router();
// eslint-disable-next-line new-cap

const users =  new User();

router.post( '/users', (req, res) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, saltRounds)
    .then((hash) => {
      userBody.password = hash;
      delete userBody.password;
    })
    .then(() => {
    users.getUser(req.body)
    .then((users) => {
      const user = users[0];
      delete user.hashed_password;
      res.status(200).json( humps.camelizeKeys(user));
    }).catch( err => {
      res.sendStatus(400);
    });
});

module.exports = router;
