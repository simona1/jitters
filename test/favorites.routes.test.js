'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../index');
const { addDatabaseHooks } = require('./utils')
suite('favorites routes', addDatabaseHooks(() => {
  suite('with login',addDatabaseHooks(() => {
    const agent = request.agent(server);

    beforeEach((done) => {
      agent
        .post('/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          username: 'coffeeAdmin',
          password: 'gotjitters',
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    test('GET /favorites/:id', (done) => {
      agent
        .get('/favorites/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [
          {
            coffeeId: 1,
            description: 'Lorem ipsum',
            flavorProfile: 'Fruity, radiant, creamy',
            name: 'Three Africas'
          }
        ], done);
    });

    test('POST /favorites', (done) => {
      agent
        .post('/favorites')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ userId: 1, coffeeId: 2 })
        .expect('Content-Type', /json/)
        .expect((res) => {
          delete res.body.createdAt;
          delete res.body.updatedAt;
        })
        .expect(200, { id: 3, coffeeId: 2, userId: 1 }, done);
    });

    test('DELETE /favorites/:id', (done) => {
    agent
      .del('/favorites/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 2,
        coffeeId: 1,
        userId: 1,
        createdAt: '2017-06-23T14:56:16.000Z',
        updatedAt: '2017-06-23T14:56:16.000Z'
      }], done);
    });
  }));
  /* eslint-enable max-len */
}));
