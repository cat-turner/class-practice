# Notes

In todays class we're going to build a basic mean and express 
stack.


1. Initialize your repository

```
npm init
```

It will walk you through to create the init file.

name: pick a url friendly name

entry point: the default loaded js file. Because we will use
Express, we don't have to use index.js. Instead use app.js,
this is the standard when using express.

test command: let's you do t.d.d. (test-driven-development)
on the fly. Skip for now.

git repository: allows you to have the git information 
filled in. Skip for now.

keywords: For NPM system. Comma-seperated-values.
Designed to create packages for other node set ups.
Put in keywords like google maps.

When you are done, you will see a package.json file.

2. All standard node package installs are stored in
node_modules

Your dependancies are found here.

3. Install what you need for the stack

```
npm install express --save

```
--save

Means, add this dependancy to the package.json file.

Some handy development tools, that never go into production!

You will see a bunch of things in your console at this point.

These are all of the dependancies used by express.

```

{
  "name": "meanskeleton",
  "version": "1.0.0",
  "description": "a barebones example",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "cathleen turner",
  "license": "MIT",
  "dependencies": {
    "express": "^4.16.2"
  }
}

```

NPM install knows which version of express to install,
it looks at your system OS. 

3. Create files standard to the mean stack.

This includes adding mongo db for your cloud 9 set up.

```
mkdir public
touch app.js
mkdir data
echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' >> mongod
chmod a+x mongod

```

your directory should have the executable.

mongod*

4. Add code to your app.js file.

Start with the bare minimum.

```
// express library

var express = require('express')

var app = express();

//listen for incoming signals on this port.

app.listen(process.env.PORT);

```

5. Try a test.js file to see if your small 
segment of code is running.

```

// Tell us what is stored in my path.

console.log(process.env.PATH)

```

6. Launch your app

```
node app.js

```

It's now waiting for a signal.

7. Preview in cloud 9.

You will see

This in the view.

```
Get/

```
You get this because you haven't told it to do anything
when it recieves the signal.

FYI - you don't actually have 8080. This is spoofed by c9.

8. Create a html file to be your root page.

```
touch index.html
```

and lets have node serve this for us



```

// refers to the http method get. This
// is a get request.
// use a call back function to load the page
app.get("/", function(request, response){
    // you get request first, then response
    
    //__dirname: js' version of 'root' dir for the app
    response.sendFile(__dirname + "/public/index.html");
    
});

```

9. Restart your server.

When you preview your app, you should see

```
Hello.
```
or whatever contents you put in.

As you edit your html file, you don't
need to restart your server.

```
Hello. :D
```

All done!

## Bonus

Trick to run your app file from any loc in your 
directory.

edit your package.json file so that you can 
start your app like this:

```
npm start
```

code:
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"node app.js"
  }
```

Use this json file to set up handy short hand
commands.

