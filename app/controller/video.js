'use strict';
module.exports = app => {
  class VideoController extends app.Controller {
    * info() {
      const { ctx, service } = this;
      const id = ctx.params.id;
      if (id.length < 7) {
        ctx.body = {
          error: 'error video id',
        };
        ctx.status = 422;
        return;
      }
      const videoInfo = yield service.video.getVideoInfo(id);
      ctx.body = {
        data: videoInfo,
      };
      ctx.status = 200;
    }
  }
  return VideoController;
};
