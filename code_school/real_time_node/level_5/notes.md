# Using express

1. install

```
npm install --save express
```

2. How to use with node

```
var express = require('express');

var app = express();

// '/' means root dir
// here we define a get endpoint
app.get('/',function(request, response){
    response.sendFile(__dirname + "/index.html");
    // the current directory
    
});

app.listen(8080);

```

3. Try the command with port 8080


curl http://localhost:8080/



## Let's add another endpoint

```
// here's our route definition
app.get('/tweets/:username', function(req, response){
// grab the username outside of the request parameters

var username = req.params.username;

// these url options will be sent to the url module's 
//format method. An example of how this would work is that the
//url will have a search, like the following:

//http://search.twitter.com/search.json?q=codeschool

options = {
    protocol: "http",
    host: 'api.twitter.com',
    pathname: '/1/statuses/user_timeline.json',
    query: {screen_name: username, count:10}
}

var twitterUrl = url.format(options);

// pipe the response to the request
request(twitterUrl).pipe(response);
    
});


```

Run your app, see tweets.

```
node app.js

curl -s http://localhost:8080/tweets/eallem

```

right now, this is going to dump a bunch of text (gross). Let's
use something that will the text in html for us.

1. start up your node server, install ejs template.

EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. 

```
app.get('/tweets/:username', function(req, response){
    request(url, function(err, res, body){
        var tweets = JSON.parse(body);
        response.locals = {tweets: tweets, name:username};
        response.render('tweet.ejs');
    });
});


```

this means that we will use ejs to render the template, tweets.ejs

```
<h1>Tweets for @<%= name %></h1>

<ul>
<% tweets.forEach(function(tweet){ %>
    <li><%= tweet.text %></li>
    <% }); %>
}
</ul>

```


## Another Example: Express server which queries out for the search
term then returns the JSON

```
var url = require('url');
var request = require('request');

var options = {
 protocol: "http:",
 host: "search.twitter.com",
 pathname: '/search.json',
 query: {
   q: "codeschool"
 }
};

var searchURL = url.format(options);

var app; // Create server here
var express = require('express');

var app = express();

app.get('/', function(req, res){
 request(searchURL).pipe(res);
}).listen(8080);
```



