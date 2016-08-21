'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

const db = {
  users: [{
    id: 1,
    username: 'a',
    password: 'a'
  },{
    id: 2,
    username: 'mcfresh',
    password: 'mcfresh'
  },{
    id: 3,
    username: 'djstale',
    password: 'djstale'
  }]
};

router.get('/users', (_req, res) => {
  res.send(db.users);
});

router.post('/users', (req, res) => {
  db.users.push(req.body);

  res.send(req.body);
});

module.exports = router;
