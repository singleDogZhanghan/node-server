const express = require('express');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const app = express();

// 注册路由
const routes = require('./routes/index');
routes.forEach(e => app.get(e.url, e.handler));

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.send('404');
});

module.exports = app;
