'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments('id').primary();
    // With delete on cascade wouldn't the coffee and user get deleted if favorite is deleted?
    table.integer('user_id').references('users.id').notNullable()
    table.integer('coffee_id').references('coffee.id').notNullable()
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorites');
}
