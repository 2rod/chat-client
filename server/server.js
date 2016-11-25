const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  let url = req.url;
  switch (url) {
    case '/' :
    case '/index.html' :
      fs.readFile('../src/index.html', (err, data) => {
        if (err) throw err;
        // console.log(data);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      });
      break;
    case '/style.css' :
      fs.readFile('../src/style.css', (err, data) => {
        if (err) throw err;
        // console.log(data);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      });
      break;
    case '/main.js' :
      fs.readFile('../src/main.js', (err, data) => {
        if (err) throw err;
        // console.log(data);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/js');
        res.end(data);
      });
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Page not found!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
