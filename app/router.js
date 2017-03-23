'use strict';
// 路由不建议拆分，不方便管理
module.exports = app => {
  
  app.redirect('/', '/news/test');
  app.get('/news/test', app.controller.news.test);
  app.get('/news', app.controller.news.list);
  app.get('/ua', function* () {
    this.body = `isIOS: ${this.isIOS}`;
  });

  // 爱奇艺server
  app.get('/video/:id', app.controller.video.info);
  app.get('/polyinfo', app.controller.polyInfo.getInfo);

  //expression
  app.post('/sessions',app.controller.session.create);
  // restful 风格的路由
  app.resources('Topic', '/api/v2/topics', 'topic');

  // app.get('/admin/user',app.controller.admain.user);
  // app.get('/admin/log',app.controller.admin.log);
  // app.get('/path',middleware1,middleware2,...,app.controller.action); //可以定义使用具体的中间件
  // app.get('/news/item/:id',app.controller.news.detail);
  // app.get('/news/user/:id',app.controller.news.user);
};
