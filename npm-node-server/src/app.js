const express = require('express');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const app = express();

// 扩展请求body解析
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// 注册路由 注意：必须写在上述“扩展”以后，否则无法解析body
const routes = require('./routes/index');
routes.forEach(e => app[e.method](e.url, e.handler));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.send('404');
});

module.exports = app;
