var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


module.exports.hotelsGetAll = function(req, res) {


  console.log('GET the hotels');
  console.log(req.query);

  var offset = 0;
  var count = 5;
  var maxCount = 10;
  
  // check if query string obj exist

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }
  
  // check for lat lon value
  // geoNEAR doesn't work
  // TODO: fix with this solution
  // https://stackoverflow.com/questions/29255525/how-to-use-geonear-in-nodejs
  // if (req.query && req.query.lat && req.query.lng){
  //   runGeoQuery(req, res);
  //   return;
  // }
  
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
  
  // check for limit in search
  if (req.query.count > maxCount){
    res
      .status(400)
      .json({
        "message": "count too large"
      });
      return;
    
  }
  
  

  Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, hotels) {
      if (err){
        console.log("error finding hotel");
        res
        .status(500)
        .json(err);
        
      }else{
        console.log("Found hotels", hotels.length);
        res
          .json(hotels);
      }

    });

};


module.exports.hotelsGetOne = function(req, res) {

  var hotelId = req.params.hotelId;
  console.log('GET hotelId', hotelId);

  // find one returns the first one
  Hotel
    .findById(hotelId)
    .exec(function(err, doc) {
      
      // use an object to hold your responses
      var response = {
          status: 200,
          message: doc
        };
      
      if (err){
        console.log("hotel not found");
      res
        .status(500)
        .json(doc);  
      
      }else if(!doc){
        //if no doc
        res
          .status(404)
          .json({
            "message": "hotel not found"
          });
          return;
        
        
      }else{
        res
          .status(200)
          .json(doc);
        
      }
      
      

  });

};

var _splitArray = function(input) {
  var output;
  if (input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
};


// this is to add a hotel to the database
module.exports.hotelsAddOne = function(req, res) {
  console.log("POST new hotel");

  Hotel
    .create({
      name : req.body.name,
      description : req.body.description,
      stars : parseInt(req.body.stars,10),
      services : _splitArray(req.body.services),
      photos : _splitArray(req.body.photos),
      currency : req.body.currency,
      location : {
        address : req.body.address,
        coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      }
    }, function(err, hotel) {
      if (err) {
        console.log("Error creating hotel");
        res
          .status(400)
          .json(err);
      } else {
        console.log("Hotel created!", hotel);
        res
          .status(201)
          .json(hotel);
      }
    });

};

// update hotel

module.exports.hotelsUpdateOne = function(req, res) {
  var hotelId = req.params.hotelId;

  console.log('GET hotelId', hotelId);

  Hotel
    .findById(hotelId)
    .select('-reviews -rooms')
    .exec(function(err, hotel) {
      if (err) {
        console.log("Error finding hotel");
        res
          .status(500)
          .json(err);
          return;
      } else if(!hotel) {
        console.log("HotelId not found in database", hotelId);
        res
          .status(404)
          .lson({
            "message" : "Hotel ID not found " + hotelId
          });
          return;
      }

      // populate hotel obj
      hotel.name = req.body.name;
      hotel.description = req.body.description;
      hotel.stars = parseInt(req.body.stars,10);
      hotel.services = _splitArray(req.body.services);
      hotel.photos = _splitArray(req.body.photos);
      hotel.currency = req.body.currency;
      hotel.location = {
        address : req.body.address,
        coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      };

      // update db
      hotel
        .save(function(err, hotelUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });


    });

};

// delete hotel
module.exports.hotelsDeleteOne = function(req, res) {
  var hotelId = req.params.hotelId;

  Hotel
    .findByIdAndRemove(hotelId)
    .exec(function(err, location) {
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        console.log("Hotel deleted, id:", hotelId);
        res
          .status(204)
          .json();        
      }
    });
};