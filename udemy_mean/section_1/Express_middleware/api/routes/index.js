// in this file we will
// require express
// instantiate the router

var express = require('express');

// instantiate the router

var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controller.js');

router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll); // mapping a controller to a route

router
  .route('/hotels/:hotelID')
  .get(ctrlHotels.hotelsGetOne); // mapping a controller to a route

router
  .route('/hotels/new')
  .post(ctrlHotels.hotelsAddOne);


// export the router you have just instantiated
// this should be at the bottom of the file

module.exports = router;

