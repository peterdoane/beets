'use strict';

const { checkAuth } = require('../middleware');
const express = require('express');
const knex = require('../knex');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/beets', (_req, res, next) => {
  knex('beets')
    .orderBy('id')
    .then((beets) => {
      res.send(beets);
    })
    .catch((err) => {
      next(err);
    });
});

// select title, image_url from beets_users inner join users on (users.id = beets_users.user_id) inner join beets on (beets.id = beets_users.beet_id) where username = 'mcfresh';

router.get('/beets/:username', (req, res, next) => {
  console.log('helloooooooo');
  knex('beets_users')
    .select('title')
    .join('users', 'users.id', '=', 'beets_users.user_id')
    .join('beets', 'beets.id', '=', 'beets_users.beet_id')
    .where('username', req.params.username)
    .then((beets) => {
      res.send(beets);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/beets', checkAuth, (req, res, next) => {
  knex('beets')
    .insert(req.body, '*')
    .then((beets) => {
      res.send(beets[0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
