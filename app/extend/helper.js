'use strict';
const moment = require('moment');
// exports.relativeTime = time => time ? moment(new Date(time * 1000)).fromNow() : moment(new Date()).fromNow();
exports.relativeTime = () => moment(new Date()).fromNow();
