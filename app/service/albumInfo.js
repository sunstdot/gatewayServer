'use strict';
module.exports = app => {
  class AlbumInfoService extends app.Service {
    constructor(ctx) {
      super(ctx);
      this.root = 'http://mixer.video.iqiyi.com/albums';
    }
    * getAlbumInfo(aid) {
      const ctx = this.ctx;
      const result = yield ctx.requestInfo(`${this.root}/${aid}`);
      //ctx.checkSuccess(result);

      return result;
    }
    }
  return AlbumInfoService;
};
