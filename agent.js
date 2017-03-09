// 该文件跑在agent进程上,agent进程优先于worker进程被master fork出来
// const Subscriber = require('subscriber');
'use strict';
const Subscriber = require('./lib/subscriber');
module.exports = agent => {
  const subscriber = new Subscriber();
  subscriber.on('changed', () => agent.messenger.sendToApp('refresh', 'push'));
  agent.messenger.on('app-ready', () => {
        // 在这里写你的初始化逻辑
        // 也可以通过 messenger 对象发送消息给 App Worker
        // 但需要等待 App Worker 启动成功后才能发送，不然很可能丢失
        // messenger是egg框架提供的进程间ipc通讯机制
    const data = {};
    agent.messenger.sendToApp('app_action', data);
  });
};
