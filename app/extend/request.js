'use strict'
// 扩展request方法
module.exports = {
  get foo() {
    return this.get('x-request-foo');
  },
};
