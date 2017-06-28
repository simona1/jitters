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

  addCoffee(coffee) {
    return knex('coffee')
      .insert(coffee,'*')
      .then((result) => {
        return camelizeKeys(result)
      })
      .catch((err) => {
        console.error(err);
    });
  }

  updateCoffee(coffee) {
    return knex('coffee')
      .where('id', coffee.id)
      .update({
        producerId: coffee.producerId,
        name: coffee.name,
        flavorProfile: coffee.flavorProfile,
        varieties: coffee.varieties,
        description: coffee.description}, '*')
      .then((result) => {
        return camelizeKeys(result)
      })
      .catch((err) => {
        console.error(err);
    });
  }
}

module.exports = Coffee;
