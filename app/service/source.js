// ipc实战在框架的多进程模型下如何使用 IPC 解决实际问题
// 我们有一个接口需要从远程数据源中读取一些数据，对外部提供 API，但是这个数据源的数据很少变化，
// 因此我们希望将数据缓存到内存中以提升服务能力，降低 RT。此时就需要有一个更新内存缓存的机制。
//    1.定时从远程数据源获取数据，更新内存缓存，为了降低对数据源压力，更新的间隔时间会设置的比较长。
//    2.远程数据源提供一个检查是否有数据更新的接口，我们的服务可以更频繁的调用检查接口，当有数据更新时才去重新拉取数据。
//    3.远程数据源通过消息中间件推送数据更新的消息，我们的服务监听消息来更新数据。
// 在实际项目中，我们可以采用方案一用于兜底，结合方案三或者方案二的一种用于提升数据更新的实时性。而在这个示例中，
// 我们会通过 IPC + 定时任务来同时实现这三种缓存更新方案
'use strict';
module.exports = app => {
  const memoryCache = {};
  return class Source extends app.Service {
    get(key) {
      return memoryCache[key];
    }
    * checkUpdate() {
            // check if remote data source has changed
            // const updated = yield mockCheck();
      const updated = true;
      this.ctx.logger.info('check update info %s', updated);
      return updated;
    }

    * update() {
            // update memoryCache from remote
            // memoryCache = yield mockCheck();
      this.ctx.logger.info('update memoryCache from remote source %j', memoryCache);
    }
    };
};
