'use strict';
module.exports = app => {
  class RankInfoService extends app.Service {
    constructor(ctx) {
      super(ctx);
      this.root = 'http://api-top.iqiyi.com/index/front';
    }
    * getRankInfo(cid, rankParams) {
      const ctx = this.ctx;
      const params = Object.assign(rankParams, {
        cid,
      });
      const result = ctx.requestInfo(`${this.root}?cid=${params.cid}&dim=${params.dim}&len=${params.len}`);
      //ctx.checkSuccess(result);
      return result.data;
    }
    }
  return RankInfoService;
};
