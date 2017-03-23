'use strict';

const createRule = {
    username:{type:'string'},
    password:{type:'string'}
};

module.exports = app => {
    class SessionController extends app.Controller {
        * create(){
            const {ctx, srevice} = this;
            try {
                ctx.validate(createRule);
                const {username, password} = ctx.request.body;
                console.log(username+"===="+password);
                const user = yield ctx.service.session.create({username,password});
                //ctx.request.session.user = user;
                ctx.set({'Access-Control-Allow-Credentials':'true'});
                ctx.body = user;
                
            }catch (err){
                ctx.logger.warn(err.errors);
                ctx.body = {success:false};
                
                return;
            }          
        }
    }
    return SessionController;
}
