'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('beets', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('image_url').notNullable().defaultTo('');
    table.json('sequence').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('beets');
};
