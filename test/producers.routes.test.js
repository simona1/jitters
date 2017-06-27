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
        }], done);

      /* eslint-enable max-len */
  })

}));
