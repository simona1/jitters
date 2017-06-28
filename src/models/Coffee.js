'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Coffee {
  getCoffee() {
    return knex('coffee')
      .orderBy('name')
      .then((result) => camelizeKeys(result))
      .catch((err) => {
        console.error(err);
    });
  }

  getCoffeeById(id) {
    return knex('coffee')
      .where('id', id)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = Coffee;
