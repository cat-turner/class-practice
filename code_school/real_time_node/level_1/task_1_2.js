// Notes:
// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
//First, tell the response which status it should have (a successful status is 200).

var http = require('http'); // how we require modules

const PORT = 3000; // bind our server to the port module to listen on

// createServer - returns the webserver object
// request and response are objects to deal with the transaction
const server = http.createServer((request, response) => {
    console.log('This is the request url:');
    console.log(request.url);
    
    // write the response
    response.writeHead(200); // status code in header
    response.write("Hello, this is Cat.");
    response.end(); // close the connection
    
});

server.listen(PORT); // Activates this server, listening on port 8080.

console.log(`Listening on port:${PORT}`);
