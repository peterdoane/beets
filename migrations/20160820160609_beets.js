'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('beets', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('image_url').notNullable().defaultTo('');
    table.string('sequence').notNullable().defaultTo('');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('beets');
};
