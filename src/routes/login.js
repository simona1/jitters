"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

const user = new User();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username.toLowerCase());
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
              // .status(200)
              // .set('Content-Type', 'text/plain')
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
