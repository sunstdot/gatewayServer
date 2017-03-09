'use strict';
// multipart方式上传文件
const FormStream = require('formstream');
module.exports = function* multipart() {
  const form = new FormStream();
    // 设置普通的key,value
  form.field('foo', 'bar');
    // 上传当前文件本身用于测试
  form.file('file', __filename);
  const result = yield this.curl('', {

    method: 'POST',
        // 生成符合multipart/form-data格式的headers
    headers: form.headers(),
        // 以stream模式提交
    stream: form,
        // 明确告诉httpclient以json格式处理响应body
    dataType: 'json',
  });
  this.body = result.data.files;
    // 响应最终会是类似以下的结果：
    // {
    //   "file": "'use strict';\n\nconst For...."
    // }
};
