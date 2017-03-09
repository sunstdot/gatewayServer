'use strict';
module.exports = appInfo => {
    return {
        logger:{
            appLogName:`${appInfo.name}--web-log`
        }
    }
}