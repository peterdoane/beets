'use strict';

const { checkAuth } = require('../middleware');
const express = require('express');
const knex = require('../knex');
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/beets_users', (req, res, next) => {
  console.log(req.body);
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
