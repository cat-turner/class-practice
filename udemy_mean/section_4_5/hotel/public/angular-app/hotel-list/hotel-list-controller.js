// line to call the module, and bind the controller
angular.module('meanhotel').controller('HotelsController', HotelsController);

// function that is in the controller
function HotelsController(hotelDataFactory) {
  var vm = this;
  vm.title = 'MEAN Hotel App';
  hotelDataFactory.hotelList().then(function(response) {
    //console.log(response);
    vm.hotels = response.data;
  });
}