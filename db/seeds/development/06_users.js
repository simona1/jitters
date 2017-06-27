
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex("users").insert([
        {
          id: 1,
          first_name: 'Coffee',
          last_name: 'Admin',
          username: 'coffeeAdmin',
          email: 'coffeeAdmin@example.com',
          hashed_password: '$2a$10$v9CRN8wan26gmPmeavSf7OSCyNWKtJMQwinDGX3GJYsP5EXNAaKXG',
          // 'gotjitters'
          access: 'admin',
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        },
        {
          id: 2,
          first_name: 'Gordon',
          last_name: 'Ramsey',
          username: 'gramsey',
          email: 'gordon@example.com',
          hashed_password: '$2a$10$aF9NUiBORPN14iYsrNqAIOE3mZsAwYf.cgo9/PkAb3Xro23elzywO',
          // 'hellskitchen'
          access: 'registered',
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        }
    ]).then( () => {
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
      });
    });
};
