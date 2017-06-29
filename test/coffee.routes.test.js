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
  });

  test('POST /coffee', (done) => {
    request(server)
      .post('/coffee')
      .set('Accept', 'application/json')
      .send({
        producer_id: 2,
        name: 'The jittery beatle',
        flavor_profile: 'caffeinated, salty, bitter',
        varieties: '',
        description: 'Don\'t drink this.'
      })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, {
      id: 5,
      producerId: 2,
      name: 'The jittery beatle',
      flavorProfile: 'caffeinated, salty, bitter',
      varieties: '',
      description: 'Don\'t drink this.'
    }, done);
      /* eslint-enable max-len */
  });

  test('POST /coffee/:id', (done) => {
    request(server)
      .post('/coffee/2')
      .set('Accept', 'application/json')
      .send({
        producer_id: 2,
        name: 'Ethiopia Bulga',
        flavor_profile: 'Cotton Candy, Strawberry, Sugar, Tangerine',
        varieties: 'Heirloom',
        description: 'delicious',
      })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, {
      id: 2,
      producerId: 2,
      name: 'Ethiopia Bulga',
      flavorProfile: 'Cotton Candy, Strawberry, Sugar, Tangerine',
      varieties: 'Heirloom',
      description: 'delicious',
    }, done);
      /* eslint-enable max-len */
  });

  test('DELETE /coffee/:id', (done) => {
    request(server)
      .del('/coffee/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 1,
        name: 'Three Africas',
        producerId: 1,
        flavorProfile: 'Fruity, radiant, creamy',
        varieties: 'Heirloom',
        description: 'Lorem ipsum',
        createdAt: '2017-06-23T14:56:16.000Z',
        updatedAt: '2017-06-23T14:56:16.000Z'
      }], done);

  });
  /* eslint-enable max-len */


}));
