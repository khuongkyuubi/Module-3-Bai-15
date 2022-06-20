const { createServer } = require("http");
const { Server } = require("socket.io");
const fs = require("fs");

const httpServer = createServer(function (req, res) {
    fs.readFile('./templates/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

const io = new Server(httpServer);

// bắt sự kiện khi có kết nối đến server socket.io
/* lắng nghe kết nối socket từ phía client */
io.on("connection", (socket) => {
    console.log('a user connected')
});

httpServer.listen(3000, 'localhost', function (){
    console.log('listening on http://localhost:3000');
});