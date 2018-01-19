// 1.5 Read File in Server
/* Now that you know how to create an HTTP server and how to read a file
off the filesystem in a non-blocking way, let's try to combine the two.
Instead of just writing a string to the HTTP response, write the contents 
of index.html to the response instead.*/

var http = require('http'); // how we require modules
var fs = require('fs');

const PORT = 3000; // bind our server to the port module to listen on

// createServer - returns the webserver object
// request and response are objects to deal with the transaction
const server = http.createServer((request, response) => {
    //console.log('This is the request url:');
    //console.log(request.url);
    
    // write the response
    response.writeHead(200); // status code in header
    fs.readFile('index_1_3.html', "utf8", function(error, contents){
        response.write(contents);
        response.end();
    });
    
     // close the connection
    
});

server.listen(PORT); // Activates this server, listening on port 8080.

console.log(`Listening on port:${PORT}`);