#!/usr/bin/env node

const package = require('./package')
const morgan = require('morgan')
//const http = require('http')
const port = process.env.PORT || 5000
const app = require('./lib/app')

//var server = http.createServer(app);

var logger = morgan('combined');
app.use(logger);

var server = app.listen(port, () => console.log(package.name + ' listening on port ' + port +  '!'))
server.listen(port);

/*
server.on('listening', function () {
    console.log(package.name + ' started. See http://localhost:' + port + '/status');
    console.log('^C to exit.');
});

server.on('error', function (e) {
    console.log(e);
});

*/
