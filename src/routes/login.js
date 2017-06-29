"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

const user = new User();

/**
 * @api {post} /login Login the user
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 * @apiParamExample {json} Input
 *    {
 *      "username": "jiitteryjoe",
 *      "password": "cantsleep",
 *    }
 * @apiSuccessExample {string} Success
 *    HTTP/1.1 200 OK
 * @apiErrorExample {string} Username required
 *    HTTP/1.1 400 Username must not be blank
 * @apiErrorExample {string} Password required
 *    HTTP/1.1 400 Password must not be blank
 * @apiErrorExample {string} Login failed
 *    HTTP/1.1 400 Bad username or password
 * @apiErrorExample {string} 500
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

/**
 * @api {get} /logout Logout the user
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiSuccessExample {string} Logout successful
 *    HTTP/1.1 200 OK
 * @apiErrorExample {string} 500
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/logout', (req, res) => {
  if (!req.cookies.auth) {
    return res
      .status(200)
      .set('Content-Type', 'text/plain')
      .send('false');
  }
  const secret = process.env.JWT_KEY;
  jwt.verify(req.cookies.auth, secret, (err, payload) => {
    if (err) {
      res.sendStatus(500);
    }
    payload.loggedIn = false;
    jwt.sign(payload, secret, (err, token) => {
      res.cookie('auth', token)
        .status(200)
        .send('Logout successful');
    });
  });
});
module.exports = router;
