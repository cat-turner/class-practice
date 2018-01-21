Notes from the video

# Level 3. Streams

Streams allow us to send data from point A to B in chunks.
This allows us to send data without interrupting processes,
and this is where node shines.

What are some important characteristics of streams?

Streams can be readable, writable, or both

We have already worked with streams. If we look at the inputs
to the call back function in our create server object....

```

http.createServer(function(request, response){
    ...
});

```
- request: the readable stream
- response: the writable stream

How does this work in action?

### How to respond to request using stream

```
http.createServer(function(request, response){
    
    //our server response with 200 in the status code
    response.writeHead(200);
    
    // write data to the stream.
    response.write("<p>Dog is running</p>");
    // our browser will see dog is running
    
    
    // to show we are still writing to the stream...
    // pause for 5 seconds, then write some more data
    // to the stream
    setTimeout( function(){
        response.write("<p>Dog is done</p>");
        response.end();
    }, 5000);
}).listen(PORT);

```

We are able to do this because within the call back function,
the channel between the server and the client (your browser)
is open, thus its ready to recieve data

### How to read from request

Event emitter inherits from readble stream. This means that
we can read from emited events.

data is reable when it is ready to be consumed.

```
http.createServer(function(request, response){
    response.writeHead(200);
    // let's read from the event
    request.on('readable',function(){
        // this is where we read the data
        // 1. Declare a chunk variable. This is
        // where we will dump our data
        
        var chunk = null;
        while(null! == (chunk = request.read())){
        
        // in the while loop, we will read the chunk from the rquest
        console.log(chunk.toString());
        
    }
    
    // now lets finish our response
    request.on('end', function(){
        response.end();
        
    });
    
        
    });
}).listen(PORT);

```

In this code, we are getting data back from the client.
How can we add to the code such that we're echoing back the data
to the client?

```

http.createServer(function(request, response){
    response.writeHead(200);

    request.on('readable',function(){

        
        var chunk = null;
        while(null! == (chunk = request.read())){
        
        // in the while loop, we will read the chunk from the rquest
        response.write(chunk);
        
    }
    
    // now lets finish our response
    request.on('end', function(){
        response.end();
        
    });
    
        
    });
}).listen(PORT);

```
Another way to do this... pipe (ie data redirection)

```
http.createServer(function(request, response){
    response.writeHead(200);

    request.on('readable',function(){

        
        // a better way to do this - simply redirect the data!
        request.pipe(response);
        
        
    }
    
    // now lets finish our response
    request.on('end', function(){
        response.end();
        
    });
    
        
    });
}).listen(PORT);

```

Note rates things of stability 

3: no major changes expected soon
2: major changes might happen soon

that means changes to the api are still
possible


To read or write a file.

```
var fs = require('fs');

var file= fs.createReadStream("readme.md");

file.pipe(newFile);

```

gulp is built on stop of strings.


```
var fs = require('fs');

var http = require('http');

http.createServer(function(request, response){

    var newFile = fs.createWriteStream("readme_copy.md");
    request.pipe(newFile);
    
    request.on('end', function(){
        response.end('uploaded!');
    });
    
    
}).listen(PORT);

```

Node was originally created to load files. 

Non-blocking comes in handy here - imagine being able to 
upload 2 files at the same time.
```

http.createServer(function(request, response){
    var newFile = fs.createWriteStream("readme_copy.md")
    
}).listen(PORT);


```

streams and file upload

```
http.createServer(function(request, response){
    var newFile = fs.createWriteStream("readme_copy.md");
    var fileBytes = request.headers['content-length'];
    var uploadedBytes = 0;
    
    
    // the readable event on the newly created stream and give it a callback
    request.on('readable', function(){
        var chunk = null;
        while(null !==(chunk = request.read())){
            uploadedBytes += chunk.length;
            var progress = (uploadedBytes / fileBytes)*100;
            // send progress back to the client using the 
            //response.write function
            response.write("progress: " + parseInt(progress,10) + "%\n");
        }
        
    });
    request.pipe(newline);
}).listen(PORT)
```
