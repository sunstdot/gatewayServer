'use strict';
module.exports = () => {
  return function* errorHandler(next) {
    try {
      yield next;
    } catch (err) {
      // 注意:自定义的错误统一处理函数，接收到错误信息后也需要`this.app.emit('error',err,this)`
      // 框架会统一监听，打印对应的错误日志
      // 所有的异常都在app上出发一个error时间，框架会记录一条错误信息
      this.app.emit('error', err, this);
      const status = err.status || 500;
      const error = status === 500 && this.app.config.env === 'prod' ? 'Internal Server Error' : err.message;
      this.body = { error };
      if (status === 422) {
        this.body.detail = err.errors;
      }
      this.status = status;
    }
  };
};
