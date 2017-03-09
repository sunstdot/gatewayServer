'use strict';
const assert = require('assert');
const mock = require('egg-mock');
describe('test/app/service/video.test.js', () => {
  let app;
  let ctx;
  before(function* () {
    app = mock.app();
    yield app.ready();
    ctx = app.mockContext();
  });
  describe('getVideoInfo', () => {
    const id = 382940000;
    it('should get success', function* () {
      app.mockHttpclient(`${ctx.service.video.root}/${id}`, 'GET', {
        tvId: 382940000,
      });
      const { tvId } = yield ctx.service.video.getVideoInfo(382940000);
      assert(tvId === 382940000);
    });
    it('should failed by id error', function* () {
      try {
        yield ctx.service.video.getVideoInfo(10000);
      } catch (err) {
        assert(err.status === -1);
      }
    });
  });
});
