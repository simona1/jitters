'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('regions', (table) => {
    table.increments('id').primary();
    table.integer('country_id').references('countries.id').notNullable();
    table.string('name').notNullable().defaultTo('');
    table.decimal('lat', 11, 7);
    table.decimal('long', 11, 7);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('regions');
}
