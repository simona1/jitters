exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('regions').del()
    .then(function() {
      // Inserts seed entries
      return knex('regions').insert([
        {
          id: 1,
          country_id: 2,
          name: 'Yirgacheffe',
          lat: 6.1620450,
          long: 38.2058150,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        }])
        .then(() => {
          return knex.raw("SELECT setval('regions_id_seq', (SELECT MAX(id) FROM regions));");
        });
    });
};
