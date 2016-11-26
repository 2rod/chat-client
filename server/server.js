const hostname = '127.0.0.1';
const port = 3000;

const http = require('http');
const fs = require('fs');
const path = require('path');

const dbPath = './db.json';

const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
// JSON.parse(fs.readFileSync(dbPath, {'encoding': 'utf-8'}));

setInterval(function () {
  fs.writeFile(dbPath, JSON.stringify(db), function () {});
}, 5000);

http.createServer(function (request, response) {
    console.log('request ', request.url);
    // console.log('full request object: ',request);

    var filePath = '../src' + request.url;
    if (request.url == '/')
        filePath = '../src/index.html';

    if (request.method === 'POST') {
      // General body parser on POST requests
      const body = [];
      request.on('data', function(chunk) {
        body.push(chunk);
      }).on('end', function() {
        request.body = JSON.parse(Buffer.concat(body).toString());
      });
    }

    if (request.url === '/messages' && request.method === 'POST') {
      request.on('end', function () {
        console.log(db);
        db.msgs.push(request.body);
        response.end();
      });
    } else if (request.url === '/messages' && request.method === 'GET') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(db.msgs));
    } else {

      var extname = String(path.extname(filePath)).toLowerCase();
      var contentType = 'text/html';
      var mimeTypes = {
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpg',
          '.gif': 'image/gif',
          '.wav': 'audio/wav',
          '.mp4': 'video/mp4',
          '.woff': 'application/font-woff',
          '.ttf': 'application/font-ttf',
          '.eot': 'application/vnd.ms-fontobject',
          '.otf': 'application/font-otf',
          '.svg': 'application/image/svg+xml'
      };

      contentType = mimeTypes[extname]; //|| 'application/octect-stream';

      fs.readFile(filePath, function(error, content) {
          if (error) {
              if(error.code == 'ENOENT'){
                  fs.readFile('../src/404.html', function(error, content) {
                      response.writeHead(200, { 'Content-Type': contentType });
                      response.end(content, 'utf-8');
                  });
              }
              else {
                  response.writeHead(500);
                  response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                  response.end();
              }
          }
          else {
              response.writeHead(200, { 'Content-Type': contentType });
              response.end(content, 'utf-8');
          }
      });
    }

}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
