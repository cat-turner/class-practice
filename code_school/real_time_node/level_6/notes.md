# Notes

## About websockets

websockets allow us to create a connection to each of our clients to the server

send data back and forth between client and server, in real time

1. install socket.io library

```
npm install --save socket.io
```

2. Add some code to use the module

app.js

```
var express = require('express');

var app = express();

var server = require('http').createServer(app);

var io = require('socket.io')(server);

// you can see that socket io and events 
// are shared in the same http server

io.on('connection', function(client){
    console.log('Client connected...');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// lets emit events on our client

io.on('connection', function(client){
    console.log('client connected...');
    
    // emit the messages event on the client
    
    client.emit('messages', {hello:'world'});
});


```

3. include the socket.io library in the clients browsers

 
```

<script src="/socket.io/socket.io.js"></script>

<script>
// connect to sock io server.
 var socket = io.connect('http://localhost:8080');
 
 socket.on('messages', function(data){
     alert(data.hello); // listen for messages events
 });
</script>

```
