'use strict';
module.exports = app => {
    class SessionService extends app.Service {
        constructor(ctx){
            super(ctx);
        }
        * create(data){
            const ctx = this.ctx;
            const {username,password} = data;
            let user = yield ctx.model.session.find({username})
            if(!user){
                yield ctx.model.session.create({username,password});
            }
            user = data;
            return user;
        }
    }
    return SessionService;
}