'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const { checkAuth } = require('../middleware');

const db = {
  beets: [{
    id: 1,
    name: 'Hip Hop Plop',
    image_url: 'http://placekitten.com/100/100',
    sequence: '[[],[],[],[],[],[],[],[],[],[],[],[],[]]'
  }, {
    id: 2,
    name: 'Eyes Like Pie',
    image_url: 'http://placekitten.com/200/200',
    sequence: '[[],[],[],[],[],[],[],[],[],[],[],[],[]]'
  }]
};

router.get('/beets', (_req, res) => {
  res.send(db.beets);
});

router.post('/beets', checkAuth, (req, res) => {
  db.beets.push(req.body);

  res.send(req.body);
});

module.exports = router;
