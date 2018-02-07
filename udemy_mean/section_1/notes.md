# Key points

## Video 5. How to write scalable code

Node.js is designed to address I/O scalability,
not compulational scalability

I/O - input and output
examples include
- interacting with databases
- reading and writing to files


Node is single threaded. This means there is only 
one process that is dealing all requests from all visitors

Complex functions should be run asyncronously so that
they dont slow down the process.


Node is non-blocking which means we can write process
as asynchronous to keep intensive compulational processes going.


Computational blocker

a process where the code takes quite a while to execute,
and this process can block other processes
and blocks the main process

solution: use child process
to spawn process and run computationally intensive tasks 
without blocking the main node process.

//child_process.spawn


## Video 6. Dependancy management


save dependancy in your package.json file

```
npm install express --save
```

save dependancy under the dev section

```
npm install mocha --save-dev
```

to install dependancies using package.json file

```
npm install
```


to specify a file to run when you start your application

(package.json file)
```
    "start": "node startup.js",
```

then run using

```
npm start
```

## Video 7. Express listen

Basic of starting up express and have it listening on a port

Express is a web application framework in mean stack


Use app.set and app.get to fetch and retirieve global values in your
app


```
app.set('port', process.env.PORT)

app.get('port')
```

## Video 8. Routing in Express


- We use routes so that we can listen for requests
on specifc urls

- do something on the server
- send some response


## Video 9. Serving static files with express

- defining static folders
- build basic html
- deliver css images, and js

Store all your static resources in your public folder

use app.use middleware

serve up content in your static folder as default

```
app.use(express.static(path.join(__dirname, 'public')));
```

You define the route structure in the first argument

```
app.use('/public', express.static(path.join(__dirname, 'public')));
```

We typically dont do this with the piblic folder. this is an example


## Video 10. Doing things when data comes in and doing things coming out

- what is middleware
- creating a logging function
- when and how to use middleware