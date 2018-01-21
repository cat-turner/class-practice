Video notes.

# 2.1 Events

## Events in the DOM

The DOM triggers events and you can listen to them.

Examples include clicking on items.

Objects in node emit events.

Node events inherit from the event emitter constructor.

eg

net.Server : emits from request (which is an event)

fs.readStream : emits from data (which is an event)

We can create custom event emitters ourselves.

```

var EventEmitter = require('events').EventEmitter;

var logger = new EventEmitter();

```

We want our logger to emit error, warn, and info events.

We can then 'listen' for these events, which means to 
execute code when it happens.

```
// listen for error

logger.on('error', function(message){
console.log('ERR: ' + message);
    
});

// emit the error

logger.emit('error', 'Oops.');

```

So how does it know what event is what?

How is this event attatched?

url:

https://nodejs.org/api/http.html#http_http_createserver_requestlistener


What are some node events?
https://nodejs.org/api/events.html


The create server function returns a new object,

Callback to create server

```
http.createServer(function(request, response){});

```

Another way to do the same thing:

```
var server = http.createServer();
server.on('request', function(request, response){});
```

You add events this way. You can add multiple events.

## Examples

### 1. Creating Event Emitters

Create a chat emitter

```
var events = require('events');
var EventEmitter = events.EventEmitter;

var chat = new EventEmitter();

chat.on('message',function(message){
  console.log(message);
  
});
```

### 2. Emitting Events

You can add to your chat code. Modify your code to emit
events.

```
var events = require('events');
var EventEmitter = events.EventEmitter;

var chat = new EventEmitter();
var users = [], chatlog = [];

chat.on('message', function(message) {
  chatlog.push(message);
});

chat.on('join', function(nickname) {
  users.push(nickname);
});

// Emit events here
chat.emit('join', "Bob");
chat.emit('message', "hello");
```

### 3. Request Event

Just like you saw in the video, refactor the HTTP server 
code to explicitly bind a callback to the 'request' 
event using the on function.

```
var http = require('http');

// note that we have removed the request callback from the
create server function

var server = http.createServer();

server.listen(8080);

server.on('request', function(request, response){
  response.writeHead(200);
  response.write("Hello, this is dog");
  response.end();
  
});
```

Note that you can bind another callback to server.
Basically, you are listening to an event more than one
time, and executing code on it.

```
server.on('request', function(request, response){
  console.log("New request coming in...");
  
});
```

Now lets add a close event.

```

server.on('close', function(){
  console.log('Closing down the server...');
  
});
```

What is a close event? Basically when the the connection
to client is closed.

More info in mozilla docs
https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
