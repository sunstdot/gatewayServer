'use strict';
// const assert = require('assert');
const mock = require('egg-mock');
const request = require('supertest');

describe('test/app/middleware/robot.test.js', () => {
  let app;
  before(() => {
        // 创建当前应用的app实例
    app = mock.app();
        // 等待app启动成功，才能执行测试用例
    return app.ready();
  });
  afterEach(mock.restore);
  it('should block robot', () => {
    return request(app.callback())
            .get('/')
            .set('User-Agent', 'BaiduSpider')
            .expect(403);
  });
});
