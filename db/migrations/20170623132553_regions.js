'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('regions', (table) => {
    table.increments('id').primary();
    table.integer('country_id').references('country.id');
    table.string('name').notNullable().defaultTo('');
    table.float('lat').notNullable().defaultTo(null);
    table.float('long').notNullable().defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('regions');
}
