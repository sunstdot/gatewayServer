'use strict';
// service层的测试只需要聚焦于自身的代码逻辑，egg-mock提供了快速测试service的方法，不再需要用supertest
// 模拟从客户端发起的请求，而是直接调用service中的方法进行测试
const assert = require('assert');
const mock = require('egg-mock');

describe('test/app/service/topic.test.js', function* () {
  let app;
  let ctx;
  before(function* () {
    app = mock.app();
    yield app.ready();
    // 创建一个全局的ctx 可以直接在ctx对象上调用service方法
    // 必须等app创建完成后才能mock context环境
    ctx = app.mockContext();
  });
  describe('create()', () => {
    it('should failed by accesstoken error', function* () {
      try {
        yield ctx.service.topic.create({
          accesstoken: 'hello',
          title: 'title',
          content: 'content',
        });
      } catch (err) {
        assert(err.status === 401);
        assert(err.message === '错误的accessToken');
      }
    });
    it('should create success', function* () {
      // 不影响cnode的正常运行，我们可以将对cnode的调用按照接口约定模拟掉
      // app.mockHttpclient 方法可以便捷的对应用发起的http请求进行模拟
      app.mockHttpclient(`${ctx.service.topic.root}/topics`, 'POST', {
        data: {
          success: true,
          topic_id: '5433d5e4e737cbe96dcef312',
        },
      });
      const id = yield ctx.service.topic.create({
        accesstoken: 'hello',
        title: 'title',
        content: 'world',
      });
      assert(id === '5433d5e4e737cbe96dcef312');
    });
  });

});
