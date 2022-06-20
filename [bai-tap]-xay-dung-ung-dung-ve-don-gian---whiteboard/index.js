const http = require('http');
const {Server} = require('socket.io');
const fs = require('fs');
const {createServer} = require("http");
const port = 3000;


// create server and display
const mimeTypes = {
    "html": "text/html",
    "js": "text/javascript",
    "css": "text/css"
};

const server = http.createServer(function (req, res) {
    if (req.url === '/') {
        res.writeHead(200, {"Content-Type": "text/html"});
        fs.createReadStream('./public/index.html').pipe(res)
    }
    /* đọc file css/js*/ // tạo static file cho file js, css
    const filesDefences = req.url.match(/\.js|.css/);
    if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        res.writeHead(200, {'Content-Type': extension});
        fs.createReadStream(__dirname + "/public" + req.url).pipe(res)
    }
});

server.listen(port, () => {
    console.log(`You are listening on http://localhost:${port}`);
});


const io = new Server(server);
io.on("connection", socket => {
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
});