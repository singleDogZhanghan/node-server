#!/usr/bin/env node

const app = require('./app.js');
const http = require('http');
const port = 3001;

app.set('port', port);

const server = http.createServer(app);
server.on('listening', function () {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
})
server.listen(port);
