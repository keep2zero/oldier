import * as net from 'net';

const server = net.createServer((socket: net.Socket) => {
    socket.on('data', (data: Buffer) => {
        console.log(data)
    })
})


server.listen(1080);


