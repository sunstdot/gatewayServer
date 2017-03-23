// 该文件跑在app worker进程上
'use strict';
module.exports = app => {
  console.log("start work process");
  app.messenger.on('refresh', by => {
    app.logger.info('start update by %s', by);
     // create an anony context to access service
    const ctx = app.createAnonymousContext();
    ctx.runInBackground(function* () {
      yield ctx.service.source.update();
      app.lastUpdateby = by;
    });
  });
  app.beforeStart(function* () {
    // 尽量少在beforestart中做太耗时的操作，框架会有启动的超时检测
    const result = yield app.curl('https://registry.npm.taobao.org/egg/latest', {
      dataType: 'json',
    });
    // 在controller中可以直接this.app.result或者app.result的方式来使用,因为app=this.app
    app.result = result.data;
  });
};
