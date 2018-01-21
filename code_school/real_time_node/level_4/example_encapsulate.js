var http = require('http');

var options = {
    host: 'localhost', port: 8080, path: '/', method: 'POST'
}

var makeRequest = function(message){
    
    // here we are encapsulating the functionality of request

    var request = http.request(options, function(response){
        response.on('data', function(data){
            console.log(data);
            
        });
    });
    
    request.write(message);
    request.end();
}

// export the module

module.exports = makeRequest;
