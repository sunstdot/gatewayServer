'use strict';
// 实现方案二，每隔10s让一个worker调用检查接口，当发现数据更新时，通过
// messenger提供的方法通知所有worker
exports.schedule = {
  interval: '10s',
  type: 'worker',    // only run in one worker
};

exports.task = function* (ctx) {
  const needRefresh = yield ctx.service.source.checkUpdate();
  if (!needRefresh) return;
    // notify all workers to update memory cache from 'file'
  ctx.app.messenger.sendToApp('refresh', 'pull');  // 发送给所有app进程
};
