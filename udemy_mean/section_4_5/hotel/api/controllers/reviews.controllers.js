var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


// GET all reviews for an individual hotel
module.exports.reviewsGetAll = function(req, res) {
  var id = req.params.hotelId;
  console.log('GET reviews for hotelId', id);

  Hotel
    .findById(id)
    .select('reviews')
    .exec(function(err, doc) {
      
      if (err){
      res
        .status(404)
        .json({
          "message": "hotel has no reviews"
          
        });
        return;
        
      }else{
       res
        .status(200)
        .json(doc.reviews);       
      }
      

    });
};

// GET single review for a hotel
module.exports.reviewsGetOne = function(req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('GET reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var review = hotel.reviews.id(reviewId); //extracts the review
      
      if (err){
        res
          .status(500)
          .json({
            "message": "error with request"
          })
      
      }else if (!review){
      res
        .status(404)
        .json({
          "message": "review not found"
          
        });
        return;
        
      }else{
        
        res
          .status(200)
          .json(review);
      }
    });
};

// adding review for hotel

var _addReview = function (req, res, hotel) {
  
  hotel.reviews.push({
    name : req.body.name,
    rating : parseInt(req.body.rating, 10),
    review : req.body.review
  });

  hotel.save(function(err, hotelUpdated) {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
    }
  });

};

module.exports.reviewsAddOne = function(req, res) {

  var id = req.params.hotelId;

  console.log('POST review to hotelId', id);

  Hotel
    .findById(id)
    .select('reviews')
    .exec(function(err, doc) {
      // make obj, and modify it below
      // is this best practice? looks bad
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding hotel");
        res
          .status(500)
          .json(err);
          return;
      } else if(!doc) {
        console.log("HotelId not found in database", id);
        res
          .status(404)
          .json({
            "message" : "Hotel ID not found " + id
          });
          return;
      }
      if (doc) {
        _addReview(req, res, doc);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });


};

// update review of hotel
module.exports.reviewsUpdateOne = function(req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", hotelId);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + hotelId
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisReview.name = req.body.name;
        thisReview.rating = parseInt(req.body.rating, 10);
        thisReview.review = req.body.review;
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });

};

// delete review - obviously a copy of update review with difference being that we remove

module.exports.reviewsDeleteOne = function(req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", hotelId);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + hotelId
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        hotel.reviews.id(reviewId).remove();
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });

};
