
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {
          id: 1,
          user_id: 1,
          coffee_id: 1,
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        }])
        .then(() => {
          return knex.raw("SELECT setval('favorites_id_seq', (SELECT MAX(id) FROM favorites));");
        });
    });
};
