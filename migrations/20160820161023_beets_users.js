'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('beets_users', (table) => {
    table.increments();
    table.integer('beet_id')
      .notNullable()
      .references('id')
      .inTable('beets')
      .onDelete('CASCADE')
      .index();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('beets_users');
};
