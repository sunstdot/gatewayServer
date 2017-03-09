'use strict';
module.exports = {
    // 通过schedule配置定时任务执行时的时间间隔等配置
  schedule: {
    interval: '1m', // 定时任务间隔时间
    type: 'all',     // 指定所有的worker都需要执行
  },
    // task 是真正的定时任务被执行时运行的函数，第一个参数是一个匿名的context实例
  * task(ctx) {
    const res = ctx.curl('xxxxx', {
      dataType: 'json',
    });
    ctx.app.cache = res;
  },
};
