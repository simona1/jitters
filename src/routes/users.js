'use strict';

const bcrypt = require( 'bcrypt' );
const bodyParser = require( 'body-parser' );
const express = require( 'express' );
const humps = require( 'humps' );
const knex = require('../knex');

const User = require('../models/User.js');
const user = new User();
const saltRounds = 10;

// eslint-disable-next-line new-cap
const router = express.Router();

router.post( '/users', ( req, res ) => {
  const pass = req.body.password;
  if (!pass || pass.length < 8) {
    res.status(400).set('Content-Type', 'text/plain').send('Password must be at least 8 characters long');
    return;
  }
  if (!req.body.email) {
    res.status(400).set('Content-Type', 'text/plain').send('Email must not be blank');
    return;
  }

  bcrypt.hash( pass, saltRounds ).then( ( hash ) => {
    req.body.hashed_password = hash;
    delete req.body.password;
  } ).then( () => {
    const newBody = req.body;

    return getUser()
      .insert( humps.decamelizeKeys( req.body ), '*' )
      .then( ( users ) => {
        if ( !users ) {
          res.status( 404 );
          return;
        }
        const user = users[0];
        console.log(users[0])
        delete user.hashed_password;

        res.status( 200 ).json( humps.camelizeKeys( user ) );
      } )
      .catch( err => {
        res.sendStatus( 400 );
      } );
  } )
} );

module.exports = router;
