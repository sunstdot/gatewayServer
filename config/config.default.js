'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = {};

  /**
   * 可直接this.config.news.pageSize 使用
   * 全局数据配置
   */
  config.keys = appInfo.name + '123456';
  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  /**
   * middleware表示中间件，数组的顺序即位中间件的加载顺序
   */
  config.middleware = [
    'robot',
    'errorHandler',
    'notfoundHandler',
  ];
  // 中间件参数
  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };
  config.errorHandler = {
    // 非 `/api/` 路径不在这里做错误处理，留给默认的 onerror 插件统一处理
    match: '/api',
  };

  /**
   * View 模版配置
   * 可以在root数组中添加多个view目录
   */
  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ],
    // 每个模板在注册时都会指定一个模板名（viewEngineName），
    // 在使用时需要根据后缀来匹配模板名，比如指定 .tpl 后缀的文件使用 nunjucks 进行渲染。
    mapping: {
      '.tpl': 'nunjucks',
      defaultViewEngine: 'nunjucks',    // 如果根据文件名后缀没有找到对应引擎，会使用默认的模版引擎进行渲染，对于只有一种模版引擎的应用建议选择此配置
    },
    defaultExtention: '.tpl',     // 一般render时需要指定文件扩展名，如果配置了此选项则可以忽略
    cache: true, // 模版路径缓存，默认开启
  };
  /**
   * mongodb 数据库连接
   */
  config.mongoose = {
    url:'mongodb://127.0.0.1/emoticon',
    optons:{}
  };
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList:['http://127.0.0.1:9090']
  }
  config.cors = {
    allowMethds:'GET,HEAD,PUT,POST,DELETE.PATCH'
  };

  return config;
};
