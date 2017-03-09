'use strict';

/**
 * 示例请求如下
 * const data = { name: 'egg' };
 * // render a template, path relate to `app/view`
 * yield this.render('home/index.tpl', data);
 *
 * // or manually set render result to this.body
 * this.body = yield this.renderView('path/to/file.tpl', data);
 *
 * // or render string directly
 * 当使用 renderString 时需要指定模板引擎，如果已经定义 defaultViewEngine 这里可以省略。
 * this.body = yield this.renderString('hi, {{ name }}', data, {
 *   viewEngine: 'nunjucks',
 * })
 */

// 关于模版渲染的一些说明
// . render(name, locals) 渲染模板文件, 并赋值给 ctx.body
// . renderView(name, locals) 渲染模板文件, 仅返回不赋值
// . renderString(tpl, locals) 渲染模板字符串, 仅返回不赋值
module.exports = app => {
  class NewsController extends app.Controller {
    * list() {
      const ctx = this.ctx;
      const pageSize = this.config.news.pageSize;
      const page = parseInt(ctx.query.page) || 1;
      const idList = yield ctx.service.hackerNews.getTopStories(page);
      const newsList = yield idList.map(id => ctx.service.hackerNews.getItem(id));
      yield ctx.render('news/list.tpl', { list: newsList, page, pageSize });
    }
    * detail() {
      const ctx = this.ctx;
      const id = ctx.params.id;
      const newsInfo = yield ctx.service.hackerNews.getItem(id);
      const commentList = yield (newsInfo.kids || []).map(kid => ctx.service.hackerNews.getitem(kid));
      yield ctx.render('news/detail.tpl', { item: newsInfo, comments: commentList });
    }
    * test() {
      const ctx = this.ctx;
      ctx.body = 'hi, egg';
    }
  }
  return NewsController;
};
