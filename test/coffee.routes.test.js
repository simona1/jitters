'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../index');
const { addDatabaseHooks } = require('./utils')
suite('coffee routes', addDatabaseHooks(() => {
  test('GET /coffee', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/coffee')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
            {
                createdAt: '2017-06-23T14:56:16.000Z',
                description: 'Lorem ipsum',
                flavorProfile: 'Baking spice, red apple, nougat',
                id: 4,
                name: 'Colombia Popayán Fall Harvest',
                producerId: 1,
                updatedAt: '2017-06-23T14:56:16.000Z',
                varieties: ''
            },
            {
                createdAt: '2017-06-23T14:56:16.000Z',
                description: 'Lorem ipsum',
                flavorProfile: 'Butterscotch Citrus',
                id: 3,
                name: 'Columbia Andino',
                producerId: 2,
                updatedAt: '2017-06-23T14:56:16.000Z',
                varieties: 'Bourbon, Caturra, Typica'
            },
            {
                createdAt: '2017-06-23T14:56:16.000Z',
                description: 'Lorem ipsum',
                flavorProfile: 'Cotton Candy, Strawberry, Sugar, Tangerine',
                id: 2,
                name: 'Ethiopia Bulga',
                producerId: 2,
                updatedAt: '2017-06-23T14:56:16.000Z',
                varieties: 'Heirloom'
            },
            {
                createdAt: '2017-06-23T14:56:16.000Z',
                description: 'Lorem ipsum',
                flavorProfile: 'Fruity, radiant, creamy',
                id: 1,
                name: 'Three Africas',
                producerId: 1,
                updatedAt: '2017-06-23T14:56:16.000Z',
                varieties: 'Heirloom'
            }
        ], done);
    /* eslint-enable max-len */
  });

  test('GET /coffee/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/coffee/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
          createdAt: '2017-06-23T14:56:16.000Z',
          description: 'Lorem ipsum',
          flavorProfile: 'Fruity, radiant, creamy',
          id: 1,
          name: 'Three Africas',
          producerId: 1,
          updatedAt: '2017-06-23T14:56:16.000Z',
          varieties: 'Heirloom'
        }, done);
    /* eslint-enable max-len */
  });

}));
