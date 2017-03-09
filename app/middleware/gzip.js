// 'use strict';
// // egg中间件形式和koa1的中间件形式是一样的，都是基于 generator function的洋葱圈模型，每编写一个中间件
// // 就相当于在洋葱外面包了一层
// const isJSON = require('koa-is-json');
// const zlib = require('zlib');

// module.exports = () => {
//   return function* gzip(next) {
//     yield next();
//     const body = this.body;
//     if (!body) return;
//     if (isJSON(body)) body = JSON.stringify(body);

//         // 设置gzip body, 修正响应头
//     body = zlib.createGzip().end(body);
//     this.set('Content-Encoding', 'gzip');
//   };
// };

