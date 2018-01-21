var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
  response.writeHead(200);
  fs.readFile('index_1_3.html', function(error, data) {
    response.write(data);
    response.end();
  });
}).listen(8080);