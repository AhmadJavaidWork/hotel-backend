if (process.env.NODE_ENV === 'production') {
  module.exports = {
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URI,
    },
  };
} else {
  require('dotenv').config({
    path: `${process.env.PWD}/.env`,
  });
  module.exports = {
    development: {
      client: 'pg',
      connection: process.env.DATABASE_URI,
      migrations: {
        directory: `${process.env.PWD}/db/migrations`,
        tableName: 'knex_migartion',
      },
      seeds: {
        directory: `${process.env.PWD}/db/seeds`,
      },
    },
  };
}
