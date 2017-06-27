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
          id: 1,
          name: 'Yirgacheffe',
          lat: 6.1620450,
          long: 38.2058150,
          countryId: 2,
          createdAt: '2017-06-23T14:56:16.000Z',
          updatedAt: '2017-06-23T14:56:16.000Z'
        },
    ], done);


  })

  test('GET /regions/:id', (done) => {
 request(server)
   .get('/regions/1')
   .set('Accept', 'application/json')
   .expect('Content-Type', /json/)
   .expect(200, [{
     "countryName": "Ethiopia",
     "description": "Lorem ipsum",
     "flavorProfile": "Fruity, radiant, creamy",
     "id": 1,
     "lat": 6.162050,
     "long": 38.20580,
     "name": "Three Africas",
     "producerId": 1,
     "regionName": "Yirgacheffe",
     "varieties": "Heirloom"
   }], done);
});

test('POST /regions', (done) => {
   request(server)
     .post('/regions')
     .set('Accept', 'application/json')
     .send({
       countryId: 1,
       name: 'Ka\'u',
     })
     .expect('Content-Type', /json/)
     .expect((res) => {
       delete res.body.createdAt;
       delete res.body.updatedAt;
     })
     .expect(200, {
       id: 2,
       countryId: 1,
       name: 'Ka\'u',
       lat: 19.2117658,
       long: -155.5232577,
     }, done);
 });
/* eslint-enable max-len */

}));
