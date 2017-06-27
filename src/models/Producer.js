'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Producer {

  getProducers() {
    return knex('producers')
      .orderBy('name')
      .then((result) => camelizeKeys(result))
      .catch((err) => {
        console.error(err)
    });
  }
}

module.exports = Producer;
