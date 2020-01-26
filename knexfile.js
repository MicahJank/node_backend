// Update with your config settings.

require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'admin',
      password: process.env.DB_PASSWORD,
      database: 'hacker-news'
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { 
      directory: './data/seeds'
    },
  },

  testing: {
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};
