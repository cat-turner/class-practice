var express = require('express');

var app = express();

// use uncapitalize static middleware
app.use(require('express-uncapitalize')());

app.use(express.static('public'));

var cities = require('./routes/cities');
app.use('/cities', cities);

app.listen(process.env.PORT, function(){
    console.log(`Listening on port ${process.env.PORT}.`);
});