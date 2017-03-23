'use strict';
const egg = require('egg');
// 要启动的进程数
const workers = Number(process.argv[2] || require('os').cpus().length);
egg.startCluster({
  baseDir: __dirname,
  workers,
  port: process.env.PORT || 7001,
});
