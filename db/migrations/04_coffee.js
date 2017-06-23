'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('coffee', (table) => {
    table.increments('id').primary();
    table.integer('producer_id').references('producers.id').notNullable().onDelete('CASCADE');
    table.string('name').notNullable().defaultTo('');
    table.string('flavor_profile').notNullable().defaultTo('');
    table.string('varieties').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('coffee');
};
