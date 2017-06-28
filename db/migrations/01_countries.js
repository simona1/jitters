'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('countries', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().defaultTo('');
    table.decimal('lat', 11, 7);
    table.decimal('long', 11, 7);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('countries');
}
