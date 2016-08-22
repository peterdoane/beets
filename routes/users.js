'use strict';

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');
// const ev = require('express-validation');
// const validations = require('../validations/users');

router.get('/users', (req, res, next) => {
  knex('users')
    .orderBy('id')
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users', (req, res, next) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  // Check if username already exists
  knex('users').where('username', username)
    .then((users) => {
      if (users.length > 0) {
        return res.status(400).set('Content-Type', 'text/plain').send('Username already exists');
      }
      bcrypt.hash(req.body.password, 12, (hashErr, hashed_password) => {
        console.log('doing something');
        if (hashErr) {
          return next(hashErr);
        }

        knex('users')
        .insert({
          username: req.body.username,
          hashed_password: hashed_password
        })
        .then((users) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          next(err);
        });
      });
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;
