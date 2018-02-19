var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
// add reviews controller
var ctrlReviews = require('../controllers/reviews.controllers.js');

// enhance the controller it so that it can accept lat lon query string
router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll);

router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne);

router
  .route('/hotels/new')
  .post(ctrlHotels.hotelsAddOne);

// Review routes

// get all reviews
router
  .route('/hotels/:hotelId/reviews')
  .get(ctrlReviews.reviewsGetAll);

// get a single review
router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne);

module.exports = router;