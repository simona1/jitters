'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Producer {

  getProducers() {
    return knex('producers')
      .orderBy('name')
      .then((result) => camelizeKeys(result));
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
      .then((result) => camelizeKeys(result));
  }

  // getProducerByName(name) {
  //   return knex('producers')
  //     .where('producers.name', name)
  //     .first()
  //     .then((result) => camelizeKeys(result));
  // }

  addProducer(producerToAdd) {
    return knex('producers')
      .insert(producerToAdd, ['id', 'country_id', 'name'])
      .then((result) => {
        return camelizeKeys(result[0]);
      });
  }

  updateProducer(id, producerToUpdate) {
    producerToUpdate = decamelizeKeys(producerToUpdate);

    return knex('producers')
      .where({ id })
      .first()
      .then((result) => {
        if (!result) { return; }
        return knex('producers')
          .where('id', id)
          .update(producerToUpdate, ['id', 'name', 'country_id'])
          .then((updatedProducer) => camelizeKeys(updatedProducer[0]));
      });
  }
}

module.exports = Producer;
