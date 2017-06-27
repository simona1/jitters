'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('coffee_regions', (table) => {
    table.increments('id').primary();
    table.integer('coffee_id').references('coffee.id').notNullable().onDelete('CASCADE');
    table.integer('region_id').references('regions.id').notNullable().onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('coffee_regions');
}
