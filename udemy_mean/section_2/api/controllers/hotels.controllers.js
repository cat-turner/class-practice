var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectID;

var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {

  var db = dbconn.get();

  // console.log("db", db);

  console.log('GET the hotels');
  console.log(req.query);

  var offset = 0;
  var count = 5;

  var collection = db.collection('hotels');

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function(err, docs) {
      console.log("Found hotels", docs.length);
      res
        .status(200)
        .json(docs);
  });

};

module.exports.hotelsGetOne = function(req, res) {
  var db = dbconn.get();
  var hotelId = req.params.hotelId;
  var collection = db.collection('hotels');
  console.log('GET hotelId', hotelId);

  // find one returns the first one
  collection
    .findOne({
      _id : ObjectId(hotelId)
    }, function(err, doc) {
      res
        .status(200)
        .json(doc);
  });

};


// this is to add a hotel to the database
module.exports.hotelsAddOne = function(req, res) {
  console.log("POST new hotel");
  var db = dbconn.get();
  var collection = db.collection('hotels');
  var newHotel;

  // check body contents to do stuff
  if (req.body && req.body.name && req.body.stars) {
    console.log(req.body);
    newHotel = req.body;
    newHotel.stars = parseInt(req.body.stars, 10);
    // the method used to insert documents into mongo db
    collection.insertOne(newHotel, function(err, response) {
      console.log("Hotel added:", response);
      console.log("Hotel added:", response.ops);
      res
        .status(201)
        .json(response.ops);
    });

  } else {
    // else statement evaluated when you have a bad request
    console.log("Data missing from body");
    res
      .status(400)
      .json({ message : "Required data missing from body" });
  }

};