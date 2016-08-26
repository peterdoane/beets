'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/musical_chairs_dev'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
