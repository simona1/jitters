
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coffee_regions').del()
    .then(function () {
      // Inserts seed entries
      return knex('coffee_regions').insert([
        {
          id: 1,
          coffee_id: 1,
          region_id: 1,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        },
        {
          id: 2,
          coffee_id: 2,
          region_id: 2,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        },
        {
          id: 3,
          coffee_id: 3,
          region_id: 3,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        },
        {
          id: 4,
          coffee_id: 4,
          region_id: 4,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        }])
        .then(() => {
          return knex.raw("SELECT setval('coffee_regions_id_seq', (SELECT MAX(id) FROM coffee_regions));");
        });
    });
};
