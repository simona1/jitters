'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Favorite {
  getAllFavoritesByUserId(id) {
    return knex('favorites')
      .select('coffee_id', 'coffee.name', 'coffee.flavor_profile', 'coffee.description')
      .innerJoin('coffee','coffee.id','favorites.coffee_id')
      .where('user_id', id)
      .then((result) => camelizeKeys(result))
      .catch((err) => {
        console.error();
    });
  }

  addFavorite(newFavorite) {
    return knex('favorites')
      .insert({
        user_id: newFavorite.userId,
        coffee_id: newFavorite.coffeeId},'*')
      .then((result) => {
        return camelizeKeys(result)
      })
      .catch((err) => {
        console.error(err);
    });
  }

  deleteFavorite(id) {
    return knex('favorites')
    .del()
    .where('id', id)
    .returning('*')
    .then((result) => {
        return camelizeKeys(result)
      })
      .catch((err) => {
        console.error(err);
    });
  }



}

module.exports = Favorite;
