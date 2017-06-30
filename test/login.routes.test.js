'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex.js');
const server = require('../index.js');
const { addDatabaseHooks } = require('./utils.js')

suite('routes login', addDatabaseHooks(() => {
  test('POST /login', (done) => {
    request(server)
      .post('/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: 'coffeeAdmin',
        password: 'gotjitters'
      })
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
        delete res.body.hashedPassword;
      })
      .expect(200)
      .expect('Content-Type', /plain/)
      .end(done);
  });

  test('POST /login with bad username', (done) => {
    request(server)
      .post('/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: 'badusername',
        password: 'gotjitters'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Bad username or password', done);
  });

  test('POST /login with bad password', (done) => {
    request(server)
      .post('/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: 'coffeeAdmin@example.com',
        password: 'badpassword'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Bad username or password', done);
  });

  test('POST /login without username', (done) => {
    request(server)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({
        password: 'gotjitters'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Username must not be blank', done);
  });

  test('POST /login without password', (done) => {
    request(server)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({
        username: 'coffeeAdmin@example.com',
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Password must not be blank', done);
  });

  // simple test, not related to login or logout
  test('GET /does-not-exist', (done) => {
    request(server)
      .get('/does-not-exist')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

}));
