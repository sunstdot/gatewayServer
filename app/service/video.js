'use strict';
module.exports = app => {
  class VideoService extends app.Service {
    constructor(ctx) {
      super(ctx);
      this.root = 'http://mixer.video.qiyi.video.domain/mixin/videos';
    }
    * getVideoInfo(id) {
      const videoInfo = yield this.ctx.curl(`${this.root}/${id}`);
      return videoInfo;
    }
  }
  return VideoService;
};
