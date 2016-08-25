'use strict';

const { checkAuth } = require('../middleware');
const express = require('express');
const knex = require('../knex');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/beets_users/beet_id/:beetId', (req, res, next) => {

  // select user ids associated w/beetid from beets
  // for each user id, select user name & add to response object

  // let ids = result of query from beets table
  knex('beets_users')
    .select('users.username')
    .join('users', 'users.id', '=', 'beets_users.user_id')
    .where('beet_id', req.params.beetId)
    .then((result) => {
      res.send(result);  // return into ids variable
    })
    .catch((err) => {
      next(err);
    });
});
// // let users = result of query from users table using ids from above
// knex('beets_users')
//   .select('user_id')
//   .where('beet_id', req.params.beetId)
//   .then((result) => {
//     res.send(result);  // return into users variable
//   })
//   .catch((err) => {
//     next(err);
//   });

// //  add user query result to response object
// res.send(collaborators)

router.get('/beets_users/username/:username', (req, res, next) => {
  // select * from beets_users inner join users on (users.id=beets_users.user_id) where username='a';
  knex('beets_users')
    .join('users', 'users.id', '=', 'beets_users.user_id')
    .select('beet_id')
    .where('username', req.params.username)
    .then((beets) => {
      res.send(beets);
    })
    .catch((err) => {
      next(err);
    });
});




router.post('/beets_users', checkAuth, (req, res, next) => {
  // req.body.beet_id
  // req.body.username

  knex('users')
    .select('id')
    .where('username', req.body.username)
    .then((users) => {
      const user_id = users[0].id;
      return knex('beets_users')
        .insert({ beet_id: req.body.beet_id, user_id: user_id }, '*')
    })
    .then((beet_user) => {
      res.send(beet_user[0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
