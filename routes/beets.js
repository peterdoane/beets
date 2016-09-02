'use strict';

const { checkAuth } = require('../middleware');
const express = require('express');
const knex = require('../knex');
const { decamelizeKeys } = require('humps');

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

// select username, beets.title from beets inner join
  // beets_users on (beets.id=beets_users.beet_id)
  // inner join users on(beets_users.user_id=users.id);
router.get('/beets/collaborators', (req, res, next) => {
  knex('beets')
    .select('username', 'title')
    .join('beets_users', 'beets.id', '=', 'beets_users.beet_id')
    .join('users', 'beets_users.user_id', '=', 'users.id')
    .then((username) => {
      res.send(username);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/beets/:username', (req, res, next) => {
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
  const { title, imageUrl, sequence } = req.body;

  knex('beets')
    .insert(decamelizeKeys({ title, imageUrl, sequence }), '*')
    .then((beets) => {
      res.send(beets[0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
