
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
        },
        {
          id: 2,
          name: 'Ethiopia Bulga',
          producer_id: 2,
          flavor_profile: 'Cotton Candy, Strawberry, Sugar, Tangerine',
          varieties: 'Heirloom',
          description: 'Lorem ipsum',
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        },
        {
          id: 3,
          name: 'Columbia Andino',
          producer_id: 2,
          flavor_profile: 'Butterscotch Citrus',
          varieties: 'Bourbon, Caturra, Typica',
          description: 'Lorem ipsum',
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        },
        {
          id: 4,
          name: 'Colombia Popayán Fall Harvest',
          producer_id: 1,
          flavor_profile: 'Baking spice, red apple, nougat',
          varieties: '',
          description: 'Lorem ipsum',
          created_at: new Date('2017-06-23 14:56:16 UTC'),
          updated_at: new Date('2017-06-23 14:56:16 UTC')
        }])
        .then(() => {
          return knex.raw("SELECT setval('regions_id_seq', (SELECT MAX(id) FROM regions));");
        });
    });
};
