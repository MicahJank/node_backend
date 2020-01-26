// These default users are NOT secure - the passwords being saved into the database are merely strings and have not been hashed. Therefore it will not work
// to log in with these users.
exports.seed = function(knex) {
  return knex('users').insert([
    {
      username: 'fakeUser1',
      email: 'fakeEmail1',
      password: 'hashPassWord'
    },
    {
      username: 'fakeUser2',
      email: 'fakeEmail2',
      password: 'hashPassWord'
    },
    {
      username: 'fakeUser3',
      email: 'fakeEmail3',
      password: 'hashPassWord'
    },
    {
      username: 'fakeUser4',
      password: 'hashPassWord'
    }
  ]);
  
};