var socks = require('socksv5');
var srv = socks.createServer(function (infor, accept, f) {
    console.log(infor);
    const socket = accept(true);
    let body = "";
    socket.on("data", (chunk) => {
        console.log("data");
        console.log(chunk);
        body += chunk;
    });
    socket.on("end", (resp) => {
        console.log("end", body);
    });
    //  const html = `<h1>hello</h1>`
    //  socket.end([
    //     'HTTP/1.1 200 OK',
    //     'Connection: close',
    //     'Content-Type: text/plain',
    //     `Content-Length:${Buffer.byteLength(html)}`,
    //     '',
    //     html
    //  ].join("\r\n"))
    // console.log(socket)
});
srv.listen(1080, 'localhost', function () {
    console.log('SOCKS server listening on port 1080');
});
srv.useAuth(socks.auth.None());
