
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coffee').del()
    .then(function () {
      // Inserts seed entries
      return knex('coffee').insert([
        {
          id: 1,
          name: 'Three Africas',
          producer_id: 1,
          flavor_profile: 'Fruity, radiant, creamy',
          varieties: 'Heirloom',
          description: 'Lorem ipsum',
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        }])
        .then(() => {
          return knex.raw("SELECT setval('regions_id_seq', (SELECT MAX(id) FROM regions));");
        });
    });
};
