const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');

const expressApp = express();

// Configuration
const HTTP_PORT = 9000;
const HTTPS_PORT = 8080;
const KEY = '/etc/ssl/localhost/localhost.key';
const CERT = '/etc/ssl/localhost/localhost.crt';

// HTTP server
const server = http.createServer(expressApp);

//HTTPS server
const secureServer = https.createServer({
    key: fs.readFileSync(KEY),
    cert: fs.readFileSync(CERT)
}, expressApp);

const io = require('socket.io')(server);
const ios = require('socket.io')(secureServer);

//Setup public file
expressApp.use(express.static('public'));

io.on("connection", (socket) => {
    new Socket(socket, HTTP_PORT);
});
ios.on("connection", (socket) => {
    new Socket(socket, HTTPS_PORT)
});

class Socket {
    constructor(socket, port) {
        console.log("Connection from client", port);
        this.socket = socket;
        this.socket.on('message', this.onMessage.bind(this));
    }
}
Socket.prototype.onMessage = function (msg) {
    console.log("client: " + msg);
    const fromServer = "Server: " + msg;
    console.log(fromServer);
    this.socket.emit("message", fromServer);
};

server.listen(HTTP_PORT, () => {
    console.log(`Server started at ${HTTP_PORT}`);
});

secureServer.listen(HTTPS_PORT, () => {
    console.log(`Secure server started at ${HTTPS_PORT}`);
});