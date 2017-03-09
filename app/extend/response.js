'use strict';
// 扩展response方法
module.exports = {
  set foo(value) {
    this.set('x-response-foo', value);
  },
};

// 可以通过this.response.foo = "bar"  调用foo方法了
