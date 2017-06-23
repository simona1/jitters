'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('producers', (table) => {
    table.increments('id').primary();
    table.integer('country_id').references('country.id').onDelete('CASCADE');
    table.string('name').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('producers');
}
