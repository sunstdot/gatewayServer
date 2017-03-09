'use strict';
const request = require('supertest');
const mock = require('egg-mock');
describe('test/app/controller/polyInfo.test.js', () => {
  let app;
  before(() => {
    app = mock.app();
    return app.ready();
  });
  afterEach(mock.restore);
  it('should GET /polyinfo 200', function* () {
    app.mockService('albumInfo', 'getAlbumInfo', {
      id: 204084301,
      name: '周末父母',
      cast: {
        mainActors: [
          {
            id: 200085505,
            name: '刘恺威',
            imageUrl: 'http://pic1.qiyipic.com/image/20160307/1b/99/p_860_m_601_m3.jpg',
          },
        ],
      },
    });
    app.mockService('rankInfo', 'getRankInfo', [
      {
        albumId: 589243300,
        albumQipuId: 589243300,
        albumName: '铁道飞虎',
        albumImageUrl: 'http://pic5.qiyipic.com/image/20170223/96/38/v_111512405_m_601_m1.jpg',
        albumUrl: 'http://www.iqiyi.com/v_19rr9tqg20.html',
        playCountLastDay: 2396483,
        playCountLastWeek: 65036074,
        playCountHistory: 78328142,
        trend: 0,
      },
    ]);
    yield request(app.callback())
      .get('/polyinfo?albumIds=204084301&channelIds=1')
      .expect(200)
      .expect({
        data: {
          albumInfo: [
            {
              id: 204084301,
              name: '周末父母',
              cast: {
                mainActors: [
                  {
                    id: 200085505,
                    name: '刘恺威',
                    imageUrl: 'http://pic1.qiyipic.com/image/20160307/1b/99/p_860_m_601_m3.jpg',
                  },
                ],
              },
            },
          ],
          rankInfo: [{
            1: [
              {
                albumId: 589243300,
                albumQipuId: 589243300,
                albumName: '铁道飞虎',
                albumImageUrl: 'http://pic5.qiyipic.com/image/20170223/96/38/v_111512405_m_601_m1.jpg',
                albumUrl: 'http://www.iqiyi.com/v_19rr9tqg20.html',
                playCountLastDay: 2396483,
                playCountLastWeek: 65036074,
                playCountHistory: 78328142,
                trend: 0,
              },
            ],
          }],
        },
      });
  });

  it('should GET /polyInfo failed 422', function* () {
    yield request(app.callback())
        .get('/polyinfo?channelIds=1')
        .expect(422)
        .expect({
          error: 'Validation Failed',
        });
  });
});
