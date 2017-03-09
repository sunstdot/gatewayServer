'use strict';
const request = require('supertest');
const mm = require('egg-mock');
describe('test/lib/ua.test.js', () => {
  let app;
  before(() => {
    app = mm.app();
    return app.ready();
  });
  after(() => app.close());
  afterEach(mm.restore);

  it('shold GET /ua with IOS', () => {
    return request(app.callback())
            .get('/ua')
            .set('user-agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1)')
            .expect(200)
            .expect('isIOS: true');
  });
  it('should GET /ua with non iOS', () => {
    return request(app.callback())
            .get('/ua')
            .expect(200)
            .expect('isIOS: false');
  });
});
