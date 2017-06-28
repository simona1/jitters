'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../index');
const { addDatabaseHooks } = require('./utils')
suite('regions routes', addDatabaseHooks(() => {
  test('GET /regions', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/regions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          id: 3,
          countryId: 3,
          name: 'Bruselas-Huila',
          lat: 1.776552,
          long: -76.176076,
          createdAt: '2017-06-23T14:56:16.000Z',
          updatedAt: '2017-06-23T14:56:16.000Z'
        },
        {
          id: 2,
          countryId: 2,
          name: 'Oromia',
          lat: 7.546038,
          long: 40.6346851,
          createdAt: '2017-06-23T14:56:16.000Z',
          updatedAt: '2017-06-23T14:56:16.000Z'
        },
        {
          id: 4,
          countryId: 3,
          name: 'Popayán',
          lat: 2.4448143,
          long: -76.6147395,
          createdAt: '2017-06-23T14:56:16.000Z',
          updatedAt: '2017-06-23T14:56:16.000Z'
        },
        {
          id: 1,
          name: 'Yirgacheffe',
          lat: 6.1620450,
          long: 38.2058150,
          countryId: 2,
          createdAt: '2017-06-23T14:56:16.000Z',
          updatedAt: '2017-06-23T14:56:16.000Z'
        }], done);
  })

  test('GET /regions/:id', (done) => {
    request(server)
     .get('/regions/1')
     .set('Accept', 'application/json')
     .expect('Content-Type', /json/)
     .expect(200, [{
       countryName: 'Ethiopia',
       description: 'Lorem ipsum',
       flavorProfile: 'Fruity, radiant, creamy',
       id: 1,
       lat: 6.1620450,
       long: 38.2058150,
       name: 'Three Africas',
       producerId: 1,
       regionName: 'Yirgacheffe',
       varieties: 'Heirloom'
     }], done);
});

test('GET /regions/:id with non number id', (done) => {
request(server)
 .get('/regions/a')
 .set('Accept', 'application/json')
 .expect('Content-Type', 'text/plain; charset=utf-8')
 .expect(404, {}, done);
});

test('POST /regions', (done) => {
   request(server)
     .post('/regions')
     .set('Accept', 'application/json')
     .send({
       country_id: 1,
       name: 'kona',
     })
     .expect('Content-Type', /json/)
     .expect((res) => {
       delete res.body.createdAt;
       delete res.body.updatedAt;
     })
     .expect(200, {
       id: 5,
       countryId: 1,
       name: 'kona',
       lat: 19.639994,
       long: -155.9969261,
     }, done);
 });

 test('POST /regions with user inputted coordinates', (done) => {
    request(server)
      .post('/regions')
      .set('Accept', 'application/json')
      .send({
        country_id: 1,
        name: 'my house',
        lat: -32.920672,
        long: 92.320881
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 5,
        countryId: 1,
        name: 'my house',
        lat: -32.920672,
        long: 92.320881,
      }, done);
  });

 test('POST /regions with too many location results', (done) => {
    request(server)
      .post('/regions')
      .set('Accept', 'application/json')
      .send({
        country_id: 2,
        name: 'columbia',
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 5,
        countryId: 2,
        name: 'columbia',
        lat: null,
        long: null
      } ,done);
  });

  test('POST /regions with unknown location', (done) => {
     request(server)
       .post('/regions')
       .set('Accept', 'application/json')
       .send({
         country_id: 2,
         name: 'fsafdsf',
       })
       .expect('Content-Type', /json/)
       .expect((res) => {
         delete res.body.createdAt;
         delete res.body.updatedAt;
       })
       .expect(200, {
         id: 5,
         countryId: 2,
         name: 'fsafdsf',
         lat: null,
         long: null
       } ,done);
   });

   test('POST /regions/:id', (done) => {
      request(server)
        .post('/regions/1')
        .set('Accept', 'application/json')
        .send({
          country_id: 2,
          name: 'kauai',
        })
        .expect('Content-Type', /json/)
        .expect((res) => {
          delete res.body.createdAt;
          delete res.body.updatedAt;
        })
        .expect(200, {
          id: 1,
          countryId: 2,
          name: 'kauai',
          lat: 22.0964396,
          long: -159.5261238,
        }, done);
    });
/* eslint-enable max-len */

}));
