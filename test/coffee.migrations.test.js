process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex.js');
const { addDatabaseHooks } = require('./utils.js')
suite('coffee migrations', addDatabaseHooks(() => {
  test('coffee columns', (done) => {
    knex('coffee').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'coffee_id_seq\'::regclass)'
          },

          name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          flavor_profile: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          varieties: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          description: {
            type: 'text',
            maxLength: null,
            nullable: false,
            defaultValue: '\'\'::text'
          },

          producer_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },

          created_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'now()'
          },

          updated_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'now()'
          }
        };

        for (const column in expected) {
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column ${column} is not the same`
          );
        }
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
