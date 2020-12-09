import * as net from 'net';

const server = net.createServer((socket: net.Socket) => {

    socket.once('data', (data: Buffer) => { //接收第一次
        console.log(data)
        socket.write(Buffer.from([0x05, 0x00])); //回复
        socket.once('data', (d: Buffer) => {  //接收数据


            const host = hostname(d.slice(4, 8)); //获取目标host
            const port = d.slice(d.length - 2).readInt16BE(0); //获取目标port
            console.log(host, port)
            const copy = Buffer.allocUnsafe(d.length);
            d.copy(copy);
            connect(host, port, copy, socket);
        })

        socket.on('error', (err) => {
            if (err) socket.destroy();
        })
    })
})



//分解Host
let hostname = function (buf: any) {
    let hostName = '';
    if (buf.length === 4) {
        for (let i = 0; i < buf.length; i++) {
            const u10 = parseInt(buf[i], 10);
            hostName += u10;
            console.log("i:", i, u10)
            if (i !== 3)
                hostName += '.';
        }
    } else if (buf.length == 16) {
        for (let i = 0; i < 16; i += 2) {
            let part = buf.slice(i, i + 2).readUInt16BE(0).toString(16);
            hostName += part;
            if (i != 14)
                hostName += ':';
        }
    }
    return hostName;
}


//
function connect(host: string, port: number, data: Buffer, sock: net.Socket) {
    // if (port < 0 || host === '127.0.0.1')
    // return;
    console.log('host %s port %d', host, port);
    console.log(data.toString())
    let socket = new net.Socket();
    socket.connect(port, host, () => {
        console.log("链接成功")
        data[1] = 0x00;
        if (sock.writable) {
            sock.write(data);
            sock.pipe(socket);
            socket.pipe(sock);
        }
    });

    socket.on('close', () => {
        socket.destroyed || socket.destroy();
    });

    socket.on('error', err => {
        if (err) {
            console.error('connect %s:%d err', host, port);
            data[1] = 0x03;
            if (sock.writable)
                sock.end(data);
            console.error(err);
            socket.end();
        }
    })
}

server.listen(1080);


