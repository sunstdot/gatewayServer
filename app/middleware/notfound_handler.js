'use strict';
module.exports = () => {
  return function* notfoundHandler(next) {
    yield next;
    if (this.status === 404 && !this.bodu) {
      if (this.acceptJSON) this.body = { error: 'not found' };
      else this.body = '<h1>page not found</h1>';    // 这里可以定向到具体页面
    }
  };
};
