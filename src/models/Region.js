'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Region {

  getRegions() {
    return knex('regions')
      .orderBy('name')
      .then((result) => camelizeKeys(result))
      .catch((err) => {
        console.error(err)
    });
  }

  getCoffeeByRegionId(id) {
    return knex('coffee')
      .select('coffee.id', 'coffee.name', 'coffee.description', 'coffee.varieties', 'coffee.producer_id', 'regions.id', 'coffee.flavor_profile', 'regions.lat', 'regions.long', 'countries.name as country_name', 'regions.name as region_name')
      .innerJoin('coffee_regions', 'coffee.id', 'coffee_regions.coffee_id')
      .innerJoin('regions', 'coffee_regions.region_id', 'regions.id')
      .innerJoin('countries', 'regions.country_id', 'countries.id')
      .where('regions.id', id)
      .then((result) => {
        return camelizeKeys(result)
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addRegion(region) {
    return knex('regions')
      .insert(region,'*')
      .then((result) => {
        return camelizeKeys(result)
      })
      .catch((err) => {
        console.error(err);
      });
  }

  createGoogleMapsUrl() {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${this.name}`
  }

  getGpsCoordinates(region) {
    return fetch(createGoogleMapsUrl(region))
   .then(response => {
       return response.json()
   })
   .then(data => {
       console.log(data)
     return data.results[0].geometry.location
  })
 }

}

module.exports = Region;
