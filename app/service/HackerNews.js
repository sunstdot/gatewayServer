'use strict';
module.exports = app => {
  class HackerNews extends app.Service {
    constructor(ctx) {
      super(ctx);
      this.config = this.ctx.app.config.news;
      this.pageSize = this.config.pageSize;
      this.serverUrl = this.config.serverUrl;
    }

    * request(api, opts) {
      const options = Object.assign({
        dataType: 'json',
      }, opts);
      const result = yield this.ctx.curl(`${this.serverUrl}/${api}`, options);
      console.log(JSON.stringify(result));
      return result.data;
    }

    * getTopStories(page, pageSize) {
      page = page || 1;
      pageSize = pageSize || this.pageSize;
      const result = yield this.request('topstories.json', {
        data: {
          orderBy: '"$key"',
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`,
        },
      });
      return Object.keys(result).map(key => result[key]);
    }

    * getItem(id) {
      return yield this.request(`item/${id}.json`);
    }

    * getUser(id) {
      return yield this.request(`user/${id}.json`);
    }
  }
  return HackerNews;
};
