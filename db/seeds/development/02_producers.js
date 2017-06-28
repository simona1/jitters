
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('producers').del()
    .then(function () {
      // Inserts seed entries
      return knex('producers').insert([
        {
          id: 1,
          name: 'Blue Bottle Coffee',
          country_id: 1,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        },
        {
          id: 2,
          name: 'Four Barrel Coffee',
          country_id: 1,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        }
      ])
      .then( () => {
        return knex.raw("SELECT setval('producers_id_seq', (SELECT MAX(id) FROM producers));");
      });
    });
};
