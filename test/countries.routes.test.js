'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../index');
const { addDatabaseHooks } = require('./utils')
suite('countries routes', addDatabaseHooks(() => {
  test('GET /countries', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/countries')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          id: 3,
          name: 'Columbia',
          lat: 4.570868,
          long: -74.297333,
          createdAt: '2017-06-23T14:56:16.000Z',
          updatedAt: '2017-06-23T14:56:16.000Z'
        },
        {
          id: 2,
          name: 'Ethiopia',
          lat: 9.145,
          long: 40.489673,
          createdAt: '2017-06-23T14:56:16.000Z',
          updatedAt: '2017-06-23T14:56:16.000Z'
        },
        {
          id: 1,
          name: 'United States',
          lat: 37.09024,
          long: -95.712891,
          createdAt: '2017-06-23T14:56:16.000Z',
          updatedAt: '2017-06-23T14:56:16.000Z'
      }
    ], done);
    /* eslint-enable max-len */
});

  test('GET /countries/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/countries/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          countryName: "Ethiopia",
          description: "Lorem ipsum",
          flavorProfile: "Fruity, radiant, creamy",
          id: 1,
          lat: 6.1620447,
          long: 38.2058155,
          name: "Three Africas",
          producerId: 1,
          regionName: "Yirgacheffe",
          varieties: "Heirloom"
        },
        {
          id: 2,
          name: 'Ethiopia Bulga',
          description: 'Lorem ipsum',
          varieties: 'Heirloom',
          producerId: 2,
          flavorProfile: 'Cotton Candy, Strawberry, Sugar, Tangerine',
          lat: 7.5460380,
          long: 40.6346851,
          countryName: 'Ethiopia',
          regionName: 'Oromia'
        }], done);
          /* eslint-enable max-len */
  });

}));
