'use strict';
const request = require("supertest");
const mock = require("egg-mock");
describe('test/app/controller/session.test.js',() => {
    let app;
    before(()=>{
        app = mock.app();
        return app.ready();
    });
    afterEach(app.restore);
});