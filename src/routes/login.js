"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

const user = new User();



/**
 * @api {post} /users/ Login
 * @apiVersion 1.0.0
 * @apiGroup Login
 * @apiSuccess {Object} user object
 // Cookie header
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {text} Missing password
 *    HTTP/1.1 400 Bad Request
 *    Password must not be blank
 * @apiErrorExample {text} Missing username
 *    HTTP/1.1 400 Bad Request
 *    Username must not be blank
 * @apiErrorExample {text} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('Username must not be blank');
  }

  if (!password) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('Password must not be blank');
  }

  user
    .getUserByUsername(username)
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('Bad username or password');
      }
      const payload = {
        id: user.id,
        username: user.username,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        loggedIn: true
      }
      bcrypt.compare(password, user.hashedPassword)
        .then(result => {
          if (!result) {
            return res
              .status(400)
              .set('Content-Type', 'text/plain')
              .send('Bad username or password');
          }
          const secret = process.env.JWT_KEY;
          const token = jwt.sign(payload, secret, (err, token) => {
            res
              .cookie('auth', token)
              .sendStatus(200);
          });
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
