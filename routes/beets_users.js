'use strict';

const { checkAuth } = require('../middleware');
const express = require('express');
const knex = require('../knex');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/beets_users/beet_id/:beetId', (req, res, next) => {
  knex('beets_users')
    .select('user_id')
    .where('beet_id', req.params.beetId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
})

router.post('/beets_users', (req, res, next) => {
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
