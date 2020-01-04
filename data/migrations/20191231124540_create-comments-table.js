
exports.up = function(knex) {
  return knex.schema.createTable('comments', tbl => {
      tbl.increments();

      tbl.string('troll_username', 255).notNullable();
      tbl.float('comment_toxicity').notNullable();
      tbl.string('comment', 510).notNullable();
      tbl.integer('users_id').unsigned().notNullable().references('users.id').onDelete('CASCADE').onUpdate('CASCADE');

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments');
};
