'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('countries', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().defaultTo('');
    table.float('lat').notNullable().defaultTo(null);
    table.float('long').notNullable().defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('countries');
}
