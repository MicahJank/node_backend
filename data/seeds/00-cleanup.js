// -- RUNNING knex seed:run will WIPE everything off the database and make it start fresh --
const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: 'truncate',
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
};
