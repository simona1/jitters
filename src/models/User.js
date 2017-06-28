'use strict';

const bcrypt = require( 'bcrypt' );
const bodyParser = require( 'body-parser' );
const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

const saltRounds = 10;

class User {
  getUsers() {
    return knex('users')
      .select('id', 'username', 'first_name', 'last_name', 'email')
      .orderBy('id')
      .then((result) => camelizeKeys(result))
      .catch((err) => {
        console.error(err);
      });
  }

  getUserById(id) {
    return knex('users')
      .select('id', 'username', 'first_name', 'last_name', 'email')
      .where('id', id)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  isAlreadyRegistered(email) {
    return knex('users')
      .select('id', 'username', 'first_name', 'last_name', 'email')
      .where('email', email)
      .first()
      .then((result) => {
        if (!result) {
          return false;
        }
        return true;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getUserByUsername(username) {
    return knex('users')
      .select('id', 'username', 'first_name', 'last_name', 'email')
      .where('username', username)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addUser(userToAdd) {
    const columns = ['first_name', 'last_name', 'username', 'email'];
    return knex('users')
      .insert(decamelizeKeys(userToAdd), ['first_name', 'last_name', 'username', 'email'])
      .returning([...columns, 'id'])
      .then((result) => {

      return camelizeKeys(result[0]);
      })
      .catch((err) => {
        console.error(err.stack);
      });
  }

  // updateUser(id, userToUpdate) {
  //   userToUpdate = decamelizeKeys(userToUpdate);
  //   return knex('users')
  //     .where({ id })
  //     .first()
  //     .then((result) => {
  //       if (!result) {
  //         return;
  //       }
  //       return knex('users')
  //         .where('id', id)
  //         .update(userToUpdate, ['id', 'first_name', 'last_name', 'username', 'email'])
  //         .then((updatedUser) =>
  //         camelizeKeys(updatedUser[0]));
  //     });
  // }
}

module.exports = User;
