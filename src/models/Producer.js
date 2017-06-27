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

  getProducerById(id) {
    return knex('producers')
      .select('producers.id as producer_id',
              'producers.name as producer',
              'coffee.id as coffee_id',
              'coffee.name as coffee')
      .innerJoin('coffee', 'producers.id', 'coffee.producer_id')
      .where('producers.id', id)
      .orderBy('coffee')
      .then((result) => camelizeKeys(result))
      .catch((err) => {
        console.error(err)
    });
  }
}

module.exports = Producer;
