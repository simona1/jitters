### Routes

* coffee
* countries
* regions
* users
* producers
* login
* access

### Coverage summary
- Statements   : 78.95% ( 435/551 )
- Branches     : 57.26% ( 71/124 )
- Functions    : 89.47% ( 51/57 )
- Lines        : 79.05% ( 434/549 )

#### Technical challenge

- Challenge - introduce login routes and make the test persist cookie information  
- Newest `supertest` package no longer has an `agent.saveCookies` function, so had to lookup the newest functionality
- Remove `^` from module versions listed in the `package.json` file to keep them stable, i.e. keep them from automatically updating to the newest versions.

#### Questions we struggled with

- What data to actually return with some of them more complex queries

- Imagining how things would look on the front-end versus back-end and how they would work for anyone interested to build an app on top of our API  

#### Features that could use improvement

- POST routes are not very user friendly
- Need more tests!
