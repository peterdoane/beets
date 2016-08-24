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

router.post('/beets', checkAuth, (req, res, next) => {
  console.log(req.body);

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
