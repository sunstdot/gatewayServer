'use strict';
const egg = require('egg');
// 要启动的进程数
const workers = Number(process.argv[2] || require('os').cpus().length);
// npm run dev DO NOT read this file
// 该文件跑在app worker进程上
module.exports = app => {
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
    const result = yield app.curl('https://registry.npm.taobao.org/egg/latest', {
      dataType: 'json',
    });
    app.result = result;
  });
};
egg.startCluster({
  baseDir: __dirname,
  workers,
  port: process.env.PORT || 7001,
});
