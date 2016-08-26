/* eslint-disable camelcase */
'use strict';

exports.seed = function(knex) {
  return knex('beets_users').del()
    .then(() => {
      return knex('beets_users').insert([{
        id: 1,
        beet_id: 1,
        user_id: 1
      }, {
        id: 2,
        beet_id: 1,
        user_id: 2
      }, {
        id: 3,
        beet_id: 2,
        user_id: 1
      }, {
        id: 4,
        beet_id: 2,
        user_id: 3
      }]);
    })
    .then(() => {
      return knex.raw(
      "SELECT setval('beets_users_id_seq', (SELECT MAX(id) FROM beets_users));"
      );
    });
};
