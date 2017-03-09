'use strict';
const request = require('supertest');
const mock = require('egg-mock');

describe('test/app/controller/video.test.js', () => {
  let app;
  before(() => {
    app = mock.app();
    return app.ready();
  });
  afterEach(mock.restore);
  it('shold GET /video/:id success', function* () {
    app.mockService('video', 'getVideoInfo', { id: '123', name: 'sunst' });
    yield request(app.callback())
            .get('/video/382940000')
            .expect(200)
            .expect({
              data: {
                id: '123',
                name: 'sunst',
              },
            });
  });
  it('should GET /video/:id faild', function* () {
    yield request(app.callback())
                .get('/video/10000')
                .expect(422)
                .expect({
                  error: 'error video id',
                });
  });
});
