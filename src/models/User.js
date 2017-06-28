'use strict';

const bcrypt = require( 'bcrypt' );
const bodyParser = require( 'body-parser' );
const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

const saltRounds = 10;


class User {
  getUser(newUser) {
    return knex('users')
      .insert(humps.decamelizeKeys(newUser), '*')
      .then((users) => {
        const result = users[0];
        delete result.hashed_password;
        return camelizeKeys(result);
      }).catch( err => {
        console.error(err);
      });
  }
}

module.exports = User;
