# Build robust REST APIs using Node.js, Express, and MongoDB

## Video 24 Intro to REST APIs

- industry standards
- URL patterns and HTTP methods
- consistant data structure
- why mongoose


### patters and how urls should be structured

Standardizing your REST API

End points
- base url
- actions that depend on http method
- we get different actions with the url, just by varying the http method

Data
- data should be consistant across all api end points
- you don't want mismatching sets of data that can be available in different parts of the api
- use mongoose to find a schema for your data and stick with it

recall 

Post: creating something new
PUT: updating something that already exists


the url concept here is simple - we get different actions with the url,
just by varying the http method.

recall that the routes for the urls are defined in:
```
api/routes/index.js
```

this approach works on nested documents.


| Method        | URL                 | Action                |
| ------------- |:-------------------:|:---------------------:|
| GET           | /api/hotels         | Get all/multiple hotels |
| POST          | /api/hotels         | Create a new hotel    |
| GET           | /api/hotels/12345   | Get a specific hotel  |
| PUT           | /api/hotels/12345   | Update a specific hotel|
| DELETE        | /api/hotels/12345   | Delete a specific hotel|
| GET           | /api/hotels/12345/reviews| Get reviews for a specific hotel |
| GET           | /api/hotels/12345/reviews/89999| Get a specific review for a hotel |
| POST           | /api/hotels/12345/reviews/89999| add a review for a hotel |
| POST           | /api/hotels/12345/reviews/89999| delete a review for a hotel |


follow this best practice to make your api easy to follow, which will let people
understand you code and make it easy for your to grow

Mongoose

- abstracts away complexities of using the native driver
- offers helper methods that make managing and writing your code easier
- use to define the structure of your data in your app

* fields in your document
* type of data required

You define this in code, in js...instead of the DB schema (like mySQL)

## Video 25 Intro to mongoose

- installing mongoose
- creating connection to DB
- tracking connection events
- close connections on app restart

we will first create a connection. Then instead of using callbacks,
mongoose uses events. We write code to catch these events and act accordingly,
essentially writing event listers when we have a db connection, when we are disconnected,
and when we have a connection error.

1. create a new database connection file in data.js

you will use mongoose to connect to the db. This is meant to replace
the dbconnection.js you used last time

```
var mongoose = require('mongoose');

var dburl = "mongodb://" + process.env.IP + ':27017/mean-hotel';

mongoose.connect(dburl);

```

note that you are no longer using the native driver to connect
to the db


2. update connection in app.js and files in your controllers dir

basically anywhere we require db connection

```
require('./api/data/db.js');
```

3. create event listener to wait for db  connection

```
mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' + dburl)
});
```

add events for 
- disconnected 
- error
- restarting node


good thing with mongo is that if your db connection dies, it will try to reconnect
to the db.


##  Video 26 defining data structures

- add schemas to the application
- assign data types
- basic data validation
- setting default values
- compiling models

We will use mongoose to build up a basic schema from what we already have in the database

1. create file: data/hotels.model.js

2. Define your schema in that file. Use mongoose's built in validation
3. tell mongoose to use the schema, at the bottom of you db connection file

```
// bring in the schemas and models
require('./hotels.model.js')
```

## Video 27 Defining complex data structures with mongoose schemas

- nested schemas for subdocuments
- storing geo-location coordinates
- creating a spherical index for geo-spatial data

recall reviews, which is an array with data inside it

```
    "reviews": [{
        "name": "Tamas",
        "id": "/user/tamas.json",
        "review": "Great hotel",
        "rating": 4
    }],
```
in terms of mongo db, reviews is a subdocument that is nested in the document

use mongoose to define sub document. Treat subdocuments as its own thing.

Geocoordinates

The db will have coordinates (lat/lon) that tell you where the hotel is located

To search for hotels nearby, you will need to tell mongo db to index the data

use 3-D sphere option coordinates

next - use mongo model to query the db


## Video 28 Creating GET routes using mongoose queries

- using mongoose and models inside controllers
- find multiple documents
- find a subset of documents
- get an indv document


in your controllers file require mongoose and hotel model

helpful methods

.findById
.exec


## Video 29 Getting subdocuments form mongoDB using API routes

- ensure data is correct
- get multiple sub documents
- get an individual subdocument


add reviews routes in your index.js

and for best practice we make a seperate reviews controller file

1. add ids to reviews
we need to update the data so that reviews are specified by an id
(we dont have _id fields for review)

you can do this yourself, typically mongo does this for you

run an update command in your mongo shell

```

db.hotels.update(
    {},
    {
        $set : {
            "reviews.0._id":ObjectId()
            
        }
    },
    {
        multi: true
    }

)

```

this command will run through all the hotels in the database, find the first review for each hotel,
create _id field, and will set it to be a new object id


2. update controller file to handle id data
3. test it by doing a get request on the api route

```
https://careerdevs-cherry-blubytes1.c9users.io:8081/api/hotels/<hotelid>/reviews/<review_id>
```

# Video 30 Get hotels out of their location

- api route filtering
- creating a geoJSON point
- using mongoose to find places nearby
- specifying search lines

geoNear doesn't work, see code for fix

# Video 31 Error handling

Tips:

- do error handling in the controller

```
  // check if not good value
  
  if (isNaN(offset) || isNaN(count)){
    // send a response
    res
      .status(400)
      .json({
        "message": "bad value for query string"
      });
      return;
  }
```

here you check the value, and you send a response

- if we have an error object returned from Hotels, handle it 
- put a check for the max count of query, bc you don't want to return a huge number (>10000)


videos 31-34
- add new hotels and reviews using post requst
- modify/update hotels and reviews using PUT
- delete

