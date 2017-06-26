'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Country {

  getCountries() {
    return knex('countries')
      .orderBy('name')
      .then((result) => camelizeKeys(result))
      .catch((err) => {
        console.error(err)
    });
  }

  getCountriesById(id) {
    return knex('countries')
      .where('id', id)
      .first()
      .then((result) => camelizeKeys(result))
      .catch((err) => {
        console.error(err);
      })
  }

  getCoffeeByCountryId(id) {
    return knex('coffee')
      .select('coffee.id', 'coffee.name', 'coffee.description', 'coffee.varieties', 'coffee.producer_id', 'regions.id', 'coffee.flavor_profile', 'regions.lat', 'regions.long', 'countries.name as country_name', 'regions.name as region_name')
      .innerJoin('coffee_regions', 'coffee.id', 'coffee_regions.coffee_id')
      .innerJoin('regions', 'coffee_regions.region_id', 'regions.id')
      .innerJoin('countries', 'regions.country_id', 'countries.id')
      .where('countries.id', id)
      .then((result) => {
        console.log(result);
        return camelizeKeys(result)
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = Country;
