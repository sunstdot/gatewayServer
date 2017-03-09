'use strict';
/**
 * 此为controller的单元测试，在写单元测试的时候可以适时的模拟service层的实现，service层的测试由service的单元测试来覆盖
 * 这样可以达到分层开发分层测试的目的
 */
const request = require('supertest');
const mock = require('egg-mock');
// const assert = require("assert");
describe('test/app/controller/topic.test.js', () => {
  let app;
    // mocha 使用 before/after/beforeEach/afterEach 来处理前置后置任务，基本能处理所有问题
  before(() => {
        // 通过egg-mock库快速创建一个应用实例
    app = mock.app();
    return app.ready();
  });
    // 因为mock之后会一直生效，我们需要避免每个单元测试用例之间是不能相互mock污染的，所以通常我们都会在afterEach 钩子里还原掉
    // 所有的mock
  afterEach(mock.restore);
    // 测试请求参数错误时应用的响应
  it('should POST /api/v2/topcis/ 422', function* () {
        // 如果参数有token需要完整走 CRSF token的过程，这样在使用supertest请求app就会自动通过CSRF校验
    app.mockCsrf();
    yield request(app.callback())
            .post('/api/v2/topics')
            .send({
              accesstoken: '123',
            })
            .expect(422)
            .expect({
              error: 'Validation Failed',
              detail: [{ message: 'required', field: 'title', code: 'missing_field' }, { message: 'required', field: 'content', code: 'missing_field' }],
            });
  });

    // mock掉service层 测试正常时返回
  it('should POST /api/v2/topics/ 201', function* () {
    app.mockCsrf();
    app.mockService('topic', 'create', 123);
    yield request(app.callback())
            .post('/api/v2/topics')
            .send({
              accesstoken: '123',
              title: 'title',
              content: 'hello',
            })
            .expect(201)
            .expect({
              topic_id: 123,
            });
  });
});

