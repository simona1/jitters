'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../index');
const { addDatabaseHooks } = require('./utils')

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
      // .expect('set-cookie', /auth=[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+; Path=\/;/)
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
}));
