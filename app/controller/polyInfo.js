'use strict';
module.exports = app => {
  class PolyInfoController extends app.Controller {
    * getInfo() {
      const { ctx, service } = this;
      // ctx.validate(polyRule);   只有post接口需要验证接口参数？因为get不传参数
      const { albumIds } = ctx.query;
      if (!albumIds) {
        ctx.status = 422;
        ctx.body = {
          error: 'Validation Failed',
        };
        return;
      }
      const albumIdArr = albumIds.split(',');
      ctx.logger.info('some request data: %j',ctx.request.body);
      // 专辑信息
      const albumInfoList = yield albumIdArr.map(aid => service.albumInfo.getAlbumInfo(aid));
      // 明星信息
      // const starIdList = albumInfoList.map(info => {
      //     if(info && info.cast && info.cast.mainActors&& info.cast.mainActors.length > 0){
      //         const mainActors = info.cast.mainActors;
      //         let obj = {};
      //         obj[info.id] = mainActors[0].id;
      //         return obj;
      //     }
      // });
      // const starInfoList = yield starIdList.map(idObj => {
      //     let keys = Object.keys(idObj)[0];
      //     const starId = idObj[keys];
      //     let obj = {};
      //     obj[keys] = service.starInfo.getStarInfo(starId);
      //     return obj;
      // });
      // 排行榜信息
      const { channelIds } = ctx.query;
      const channelIdsArr = channelIds.split(',');
      const rankParams = {
        dim: ctx.query.rankDim || 'wee',
        len: ctx.query.rankSize || '30',
      };

      const rankInfo = yield channelIdsArr.map(cid => {
        const obj = {};
        obj[cid] = service.rankInfo.getRankInfo(cid, rankParams);
        return obj;
      });
      ctx.status = 200;
      ctx.body = {
        data: {
          albumInfo: albumInfoList,
          // 'starInfo':starInfo,
          rankInfo,
        },
      };
    }
  }
  return PolyInfoController;
};
