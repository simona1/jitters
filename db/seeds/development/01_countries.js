
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('countries').del()
    .then(function () {
      // Inserts seed entries
      return knex('countries').insert([
        {
          id: 1,
          name: 'United States',
          lat: 37.09024,
          long: -95.712891,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        },
        {
          id: 2,
          name: 'Ethiopia',
          lat: 9.145,
          long: 40.489673,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        },
      ])
      .then( () => {
        return knex.raw("SELECT setval('countries_id_seq', (SELECT MAX(id) FROM countries));");
      });
    });
};
