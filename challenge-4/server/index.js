const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            req.url = '/index.html';
            break;
        case '/cars':
            req.url = '/cars.html';
            break;
    }
    let path = `public${req.url}`;
    console.log(path);
    let ext = req.url.split('.')[1];
    if (ext == 'svg') {
        fs.readFile(path, (err, data) => {
            res.writeHead(200, {
                'Content-Type': 'image/svg+xml'
            });
            res.end(data);
        });
    } else {
        fs.readFile(path, (err, data) => {
            res.writeHead(200);
            res.end(data);
        });
    }

}).listen(3000, () => {
    console.log('Server is running on port 3000');
});