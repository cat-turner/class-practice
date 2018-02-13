# Introduction to noSQL databases

## Video 16. Intro to NoSQL databases

Mongo db is a document store

In a nosql database we group data in form of collections. An example would be a collection
of posts.


Collections is a grouping of documents

We use object ids for efficient searches.


An example of a collection, called users:

[
    {
        "userId": 1,
        "UserName": "simon"
    },
    {
        "userId": 3,
        "UserName": "ralph"
        
    }


]


An example where we have posts. This is how we would group the information'

[

{
    "PostId": 1,
    "Title": "My first post",
    "Content": "Some comments",
    "Comments": [
    {
        "commentId":1,
        "content": "commenting on your first post"
    }
    
    ],
    "Author":{
        "Id":1,
        "DisplayName": "simon holmens"
    }
},
{
    "PostId": 2,
    "Title": "My second post",
    "Content": "Some more comments",
    "Comments": [
    {
        "commentId":1,
        "content": "commenting on your first post"
    },
    
    ],
    "Author":{
        "Id":1,
        "DisplayName": "simon holmens"
    }
    
}

]

## Video 17

Mongo creates unqiue object ids, which are alpha numeric
will search document using these ids

## Video 18

Getting started with mongodb shell

- Listing db and collections
- creating databases, collections, and documents
- retrieving documents

> make it pretty

```
> db.tech.find().pretty()
{
        "_id" : ObjectId("5a825fce079afd1433271577"),
        "name" : "mongodb",
        "role" : "db"
}
```

insert multiple entries like this:

```
db.tech.insert(
[{
    name: "Express",
    role: "Web application server"
},
{
    name: "Angular",
    role: "front-end framework"
    
},
{
    name: "Node.js",
    role: "platform"
}]
)

```

## Video 19

- querying the database to find documents
- modifying the data returned: e.g. sorting
- updating documents
- deleting documents

Let's get started. quickly view your contents

```
> show dbs
admin     (empty)
local     0.078GB
meantest  0.078GB
> use meantest
switched to db meantest
> db.meantest.find()
> db.tech.find()
{ "_id" : ObjectId("5a825fce079afd1433271577"), "name" : "mongodb", "role" : "db" }
{ "_id" : ObjectId("5a8260cf079afd1433271578"), "name" : "Express", "role" : "Web application server" }
{ "_id" : ObjectId("5a8260cf079afd1433271579"), "name" : "Angular", "role" : "front-end framework" }
{ "_id" : ObjectId("5a8260cf079afd143327157a"), "name" : "Node.js", "role" : "platform" }
{ "_id" : ObjectId("5a8260f7079afd143327157b"), "name" : "Express", "role" : "Web application server" }
{ "_id" : ObjectId("5a8260f7079afd143327157c"), "name" : "Angular", "role" : "front-end framework" }
{ "_id" : ObjectId("5a8260f7079afd143327157d"), "name" : "Node.js", "role" : "platform" }
```

on changing values, use keyword $set

```
db.tech.update(
{
    "name": "Angular"
},
{
    $set : {"name": "AngularJS"}
}

)

```

this updates a singel doc. For multiple, use opt mult=true

```
db.tech.update(
{},
{$set: {"language": "Javascript"}},
{multi:true}

)

```

remove values

```
db.tech.remove({"name": "Express"})
```

passing an empty parameter, you remove all documents

```
db.tech.find()

```

to drop an entire collection

```
db.tech.drop()
```

## Video 20

- exporting and importing bson, json data
- when to use different approaches


to export that data you have in your database
(do this outside of mongo db terminal)

```
mongodump --db meantest 
```

the data for this data will be exported to the dump folder in a bson file

lets now export this data in a compressed format. delete meantest folder and do the following

use the same command, with the jzip option

```
mongodump --db meantest --gzip
```

to restore data, whose name will be mean2

```
mongorestore --db mean2 dump/meantest
```

check out your mongo terminal and see your new db

now lets export a collection

```
mongoexport --db meantest --collection tech
```

we should see that our data is exported

```
connected to: 127.0.0.1
{ "_id" : { "$oid" : "5a8270e6079afd143327157e" }, "name" : "Express", "role" : "Web application server" }
{ "_id" : { "$oid" : "5a8270e6079afd143327157f" }, "name" : "Angular", "role" : "front-end framework" }
{ "_id" : { "$oid" : "5a8270e6079afd1433271580" }, "name" : "Node.js", "role" : "platform" }
exported 3 records
```

to export in json

```
mongoexport --db meantest --collection tech --out  MEAN/api/data/tech.json

```

to wrap into json array, pass the option

```
--jsonArray
```
we get a json representation of the data. this is because we cant directly import/export mongo db objects, such as the id


to import data

```
mongoimport --db mean3 --collection tech --jsonArray MEAN/api/data/tech.json
```
checking our db, we see that we have our data

```
> db.tech.find()
{ "_id" : ObjectId("5a8270e6079afd143327157e"), "name" : "Express", "role" : "Web application server" }
{ "_id" : ObjectId("5a8270e6079afd143327157f"), "name" : "Angular", "role" : "front-end framework" }
{ "_id" : ObjectId("5a8270e6079afd1433271580"), "name" : "Node.js", "role" : "platform" }

```

## Video 21

connection to a node.js app

-installing the driver
-creating a reusable connection
-defining the connection string
-accessing the connection from controllers
-best practices

let's import our hotel data

```
mongoimport --db mean-hotel --collection hotels --jsonArray MEAN/api/data/hotel-data.json
```

and confirm its there in our running mongo shell

```
>use mean-hotel
switched to db mean-hotel
> show collections
hotels
system.indexes
> db.hotels.find()
{ "_id" : ObjectId("5a827bccf6930aa6e1fa6b8b"), "name" : "Corinthia Hotel Budapest", "stars" : 5, "description" : "The 5-star Corinthia Hotel Budapest on the Grand
....
```

now lets set up our node such that it will talk to the db

```
npm install mongodb --save
```

create a file that specifies your db connection, called dbconnections.js

since we want to create the db connection as soon as we start, we should do this from app.js

so save this in the config file

```
"start": "node app.js"
```

be sure to install these packages
- express
- body-parser
- mongod

then run the app using

```
npm start
```
 Lots of junk text should appear in your console.
 
 you will see in our controller that we
 pass our connection into a variable

```
   // save the connection obj as a variable
  var db = dbconn.get();
  // this can now be used in any way
  // in our application
```

this is what we use to do db operations.
this is essentially a reusable connection.

Now that everything is running (yay!)
access page using this url

(apply your cloud9 info here)

```

https://careerdevs-cherry-blubytes1.c9users.io:8081/
```

## Video 22

querying node db from an existing app
- use open db connection
- finding multiple docs in a collection
- returning a sub-set
- searching for a single document by ID

code in the controller will be updated so that we read data from the db... and not from the json file

rerun app. Call this method from the api, use the browser


the method used to insert docs
```
collection.insertOne(...)
```