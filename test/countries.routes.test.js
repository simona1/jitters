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
      .expect(200, [{
        id: 1,
        name: 'United States',
        lat: 37.09024,
        long: -95.712891,
        created_at: new Date('2017-06-23 14:56:16 UTC'),
        updated_at: new Date('2017-06-23 14:56:16 UTC')
      },
      {
        id: 2,
        name: 'Ethiopia',
        lat: 9.145,
        long: 40.489673,
        created_at: new Date('2017-06-23 14:56:16 UTC'),
        updated_at: new Date('2017-06-23 14:56:16 UTC')
      }], done);

      /* eslint-enable max-len */
  });

}));
