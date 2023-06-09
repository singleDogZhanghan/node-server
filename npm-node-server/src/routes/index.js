const routes = [
    {url: '/get', handler: require('./api01.js'), method: 'get'},
    {url: '/add', handler: require('./api02.js'), method: 'post'},
    {url: '/modify', handler: require('./api03.js'), method: 'put'},
    {url: '/remove', handler: require('./api04.js'), method: 'put'},
]
module.exports = routes;
