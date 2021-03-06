
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();

      tbl.string('username', 255).notNullable().unique();
      tbl.string('email', 255).unique();
      tbl.string('password', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
