'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex.js');
const server = require('../index.js');
const { addDatabaseHooks } = require('./utils.js')
suite('producers routes', addDatabaseHooks(() => {
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

  test('GET /producers', (done) => {
    /* eslint-disable max-len */
    agent
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

  test('GET /producers/:id', (done) => {
    /* eslint-disable max-len */
    agent
      .get('/producers/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          producerId: 1,
          producer: 'Blue Bottle Coffee',
          coffeeId: 4,
          coffee: "Colombia Popayán Fall Harvest",
        },
        {
          producerId: 1,
          producer: 'Blue Bottle Coffee',
          coffeeId: 1,
          coffee: "Three Africas",
        }], done);

      /* eslint-enable max-len */
  });

  test('GET /producers/:id that doesn\'t exist', (done) => {
    request(server)
      .get('/producers/1000')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('POST /producers', (done) => {
    /* eslint-disable max-len */
    agent
      .post('/producers')
      .set('Accept', 'application/json')
      .send({
        name: 'Jittery Joes Coffee',
        country_id: 1
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 3,
        name: 'Jittery Joes Coffee',
        countryId: 1
      }, done);

      /* eslint-enable max-len */
  });

  test('POST /producers/:id', (done) => {
    /* eslint-disable max-len */
    agent
      .post('/producers/1')
      .set('Accept', 'application/json')
      .send({
        id: 1,
        name: 'Beige Bottle Coffee'
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 1,
        name: 'Beige Bottle Coffee',
        countryId: 1
      }, done);

      /* eslint-enable max-len */
  });

}));
