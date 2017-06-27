'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../index');
const { addDatabaseHooks } = require('./utils')
suite('producers routes', addDatabaseHooks(() => {
  test('GET /producers', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/producers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          id: 1,
          name: 'Blue Bottle Coffee',
          countryId: 1,
          createdAt: '2017-06-23T14:56:16.000Z',
          updatedAt: '2017-06-23T14:56:16.000Z'
        },
        {
          id: 2,
          name: 'Four Barrel Coffee',
          countryId: 1,
          createdAt: '2017-06-23T14:56:16.000Z',
          updatedAt: '2017-06-23T14:56:16.000Z'
        }
      ], done);

      /* eslint-enable max-len */
  });

  test('GET /producers:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/producers/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          producerId: 1,
          producer: 'Blue Bottle Coffee',
          coffeeId: 4,
          coffee: "Colombia Popayán Fall Harvest",
          // createdAt: '2017-06-23T14:56:16.000Z',
          // updatedAt: '2017-06-23T14:56:16.000Z'
        },
        {
          producerId: 1,
          producer: 'Blue Bottle Coffee',
          coffeeId: 1,
          coffee: "Three Africas",
          // createdAt: '2017-06-23T14:56:16.000Z',
          // updatedAt: '2017-06-23T14:56:16.000Z'
        }], done);

      /* eslint-enable max-len */
  });

}));
