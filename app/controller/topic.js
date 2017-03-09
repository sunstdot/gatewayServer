'use strict';
// 定义创建接口的请求参数规则
const createRule = {
  accesstoken: 'string',
  title: 'string',
  tab: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false },
  content: 'string',
};

// 两种代码书写方式，第一种this 为第二种的this.ctx，因为第二种this指向的app全局环境


// exports.create = function* () {
//   this.validate(createRule);
//   const id = yield this.service.topic.create(this.request.body);
//   this.body = {
//     topic_id: id,
//   };
//   this.status = 201;
// };

module.exports = app => {
  class TopicController extends app.Controller {
    * create() {
      // 检验`this.request.body` 是否符合我们预期的格式
      // 如果参数校验未通过，将会抛出一个status=422 的异常
      const { ctx, service } = this;
      ctx.validate(createRule);

      const id = yield service.topic.create(ctx.request.body);
      // restful api 只返回状态码跟内容
      ctx.body = {
        topic_id: id,
      };
      ctx.status = 201;
    }
  }
  return TopicController;
};
