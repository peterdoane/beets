'use strict';

exports.seed = function(knex) {
  return knex('beets').del()
    .then(() => {
      return knex('beets').insert([{
        id: 1,
        title: 'Hip Hop Flop',
        image_url: 'http://placekitten.com/100/100',
        sequence: '[[],[],[],[],[],[],[],[],[],[],[],[],[]]'
      },{
        id: 2,
        title: 'Eyes Like Pie',
        image_url: 'http://placekitten.com/200/200',
        sequence: '[[],[],[],[],[],[],[],[],[],[],[],[],[]]'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('beets_id_seq', (SELECT MAX(id) FROM beets));"
      );
    });
};
