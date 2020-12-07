"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(data);
    });
});
server.listen(1080);
