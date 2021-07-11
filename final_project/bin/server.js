/**
 * Victor Rodrigues Russo 11218855
 */


const app = require('../src/app')
const http = require('http')
const debug = require('debug')('nodestr:server')
const express = require('express')


const port = normalizePort(process.env.PORT || '3000')
app.set('port',port)


const server = http.createServer(app)

server.listen(port)
server.on('error',onError)
server.on('listening',onListening)

console.log('Running on '+port)
console.log('GET /info to get more informations ')


function normalizePort(val){
    const port = parseInt(val,10)

    if(isNaN(port)){
        return val;
    }

    if(port >= 0){
        return port
    }

    return false
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw console.error()
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    switch (error.code) {
        case 'EACEES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)

        case 'EADDRINUSE':
            console.error(bind + ' is already n use')
            process.exit(1)

        default:
            throw error;
    }
}

function onListening() { 
    const addr = server.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    debug('Listening on ' + bind)
}