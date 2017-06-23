
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex("users").insert([{
        id: 1,
        first_name: 'Gordon',
        last_name: 'Ramsey',
        username: 'gramsey',
        email: 'gordon@hellskitchen.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',  // youreawizard
        created_at: new Date('2017-06-23 14:56:16 UTC'),
        updated_at: new Date('2017-06-23 14:56:16 UTC')
      }]).then( () => {
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
      });
    });
};
