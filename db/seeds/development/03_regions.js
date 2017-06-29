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
          lat: 6.1620447,
          long: 38.2058155,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        },
        {
          id: 2,
          country_id: 2,
          name: 'Oromia',
          lat: 7.546038,
          long: 40.6346851,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        },
        {
          id: 3,
          country_id: 3,
          name: 'Bruselas-Huila',
          lat: 1.776552,
          long: -76.176076,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        },
        {
          id: 4,
          country_id: 3,
          name: 'Popayán',
          lat: 2.4448143,
          long: -76.6147395,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        }])
        .then(() => {
          return knex.raw("SELECT setval('regions_id_seq', (SELECT MAX(id) FROM regions));");
        });
    });
};
