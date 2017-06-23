'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE');
    table.integer('coffee_id').references('coffee.id').notNullable().onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorites');
}
