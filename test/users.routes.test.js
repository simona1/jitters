'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const bcrypt = require('bcrypt');
const knex = require('../knex');
const server = require('../index');
const { addDatabaseHooks } = require('./utils')

suite('users routes', addDatabaseHooks(() => {
  test('POST /users', (done) => {
    const password = 'jitterbug';

    request(server)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'Joe',
        lastName: 'Trader',
        email: 'joe.trader@example.com',
        password
      })
      .expect((res) => {
        delete res.body.access;
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 3,
        firstName: 'Joe',
        lastName: 'Trader',
        userName: 'traderjoe',
        email: 'joe.trader@example.com'
      })
      .expect('Content-Type', /json/)
      .end((httpErr, _res) => {
        if (httpErr) {
          return done(httpErr);
        }

        knex('users')
          .where('id', 3)
          .first()
          .then((user) => {
            const hashedPassword = user.hashed_password;

            delete user.hashed_password;
            delete user.access;
            delete user.created_at;
            delete user.updated_at;

            assert.deepEqual(user, {
              id: 3,
              first_name: 'Joe',
              last_name: 'Trader',
              username: 'traderjoe',
              email: 'joe.trader@example.com'
            });

            // eslint-disable-next-line no-sync
            const isMatch = bcrypt.compareSync(password, hashedPassword);

            assert.isTrue(isMatch, "passwords don't match");
            done();
          })
          .catch((dbErr) => {
            done(dbErr);
          });
      });
  });
}));
