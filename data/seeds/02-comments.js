exports.seed = function(knex) {
  return knex('comments').insert([
    {
      troll_username: 'troll1',
      comment_toxicity: 0.5,
      comment: 'This is a troll comment',
      users_id: 1
    },
    {
      troll_username: 'troll2',
      comment_toxicity: 0.1,
      comment: 'This is a troll comment',
      users_id: 2
    },
    {
      troll_username: 'troll3',
      comment_toxicity: 0.7,
      comment: 'This is a troll comment',
      users_id: 1
    },
    {
      troll_username: 'troll1',
      comment_toxicity: 0.1,
      comment: 'This is a troll comment',
      users_id: 3
    }
  ]);
  
};