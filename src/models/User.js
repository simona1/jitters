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
      .then((result) => camelizeKeys(result));
  }

  getUserById(id) {
    return knex('users')
      .select('id', 'username', 'first_name', 'last_name', 'email')
      .where('id', id)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  getUser(id) {
    return knex('users')
      .select('id', 'username', 'first_name', 'last_name', 'email')
      .where(knex.raw('LOWER("email") = ?', email.toLowerCase()))
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  getUserByUsername(username) {
    return knex('users')
      .select('id', 'username', 'first_name', 'last_name', 'email', 'hashed_password')
      .where(knex.raw('LOWER("username") = ?', username.toLowerCase()))
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  addUser(userToAdd) {
    const columns = ['first_name', 'last_name', 'username', 'email'];
    return knex('users')
      .insert(decamelizeKeys(userToAdd), ['first_name', 'last_name', 'username', 'email'])
      .returning([...columns, 'id'])
      .then((result) => {
        return camelizeKeys(result[0]);
      });
  }

  updateUser(id, fieldsToUpdate) {
    fieldsToUpdate = decamelizeKeys(fieldsToUpdate);
    return knex('users')
      .select('*')
      .where('id', id)
      .update(fieldsToUpdate, ['id', 'first_name', 'last_name', 'email', 'username'])
      .then((updatedUser) => {
        return camelizeKeys(updatedUser[0]);
      });
  }
}

module.exports = User;
