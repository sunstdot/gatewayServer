'use strict';

module.exports = app => {
  class TopicService extends app.Service {
    constructor(ctx) {
      super(ctx);
      this.root = 'http://cnodejs.org/api/v1';
    }
    * create(params) {
            // 调用cnode v1版本 API
      const result = yield this.ctx.curl(`${this.root}/topics`, {
        method: 'post',
        data: params,
        dataType: 'json',
        contentType: 'json',
      });
            // 检查调用是否成功，如果调用失败会抛出异常
      this.checkSuccess(result);
            // 返回创建的topic 的id
      return result.data.topic_id;
    }

        // 统一封装的调用检查函数，可以在查询、创建和更新等service中复用
    checkSuccess(result) {
      if (result.status !== 200) {
        const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unkown error';
        console.log(result.status + '======' + errorMsg);
        this.ctx.throw(result.status, errorMsg);
      }
      if (!result.data.success) {
        this.ctx.throw(500, 'remote response error', { data: result.data });
      }
    }
    }
  return TopicService;
};
