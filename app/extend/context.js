'use strict';
module.exports = {
  get isIOS() {
    const iosReg = /iphone|ipad|ipod/i;
    return iosReg.test(this.get('user-agent'));
  },
  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknow error';
      this.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      this.throw(500, 'remote response error', { data: result.data });
    }
  },
  * requestInfo(url,opt){
    if(!opt){
      opt = {};
    }
    //this 就是ctx对象 在其中可以调用ctx 上的其他方法，或访问属性
    const result = yield this.curl(url, Object.assign({
        method: 'GET',
        dataType: 'json',
        timeout: [ '30s', '30s' ],
    },opt));
    return result;
  }
};
