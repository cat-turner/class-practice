// this controller will be run when the api/hotels/ route is called

// this will get all hotels

var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req,res){
    
  console.log("GET the hotels");
  // add this line to get the query
  // string parameter from the url
  console.log(req.query);
  
  var offset = 0;
  var count = 5;
  
  // check if query property is existing on the status object
  if (req.query && req.query.offset){
      // check if the query has a property of offset
      offset = parseInt(req.query.offset, 10);
      
  }
  
  // handle queries for count, much in the same way
  if (req.query && req.query.count){
      // check if the query has a property of offset
      offset = parseInt(req.query.count, 10);
      
  }
  
  
  var returnData = hotelData.slice(offset,offset+count);
  
  res
    .status(200)
    .json(returnData);
};

// this is the controller. it will return the data
// from the hotel provided the id
module.exports.hotelsGetOne = function(req,res){
    var hotelID = req.params.hotelID;
    var thisHotel = hotelData[hotelID];
    console.log("showing hotel");
    
  console.log("GET hotelID", hotelID);
  res
    .status(200)
    .json(thisHotel);
};

module.exports.hotelsAddOne = function(req, res){
    console.log("POST new hotel");
    console.log(req.body);
    res
        .status(200)
        .json(req.body);
}