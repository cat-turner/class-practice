// call angular module, and call the  the dependancy ngRoute
angular.module('meanhotel', ['ngRoute']).config(config);

function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/hotel-list/hotels.html',
      controller: HotelsController,
      controllerAs: 'vm'
    })
    .when('/hotel/:id', {
      templateUrl: 'angular-app/hotel-display/hotel.html',
      controller: HotelController,
      controllerAs: 'vm'
    });
}

// wow, wtf why change this
// url encoding breaks routes
//https://stackoverflow.com/questions/41211875/angularjs-1-6-0-latest-now-routes-not-working
// you have to add ! in the beginning of your routes

/*
<body>
    <a href="#!/add-quote">Add Quote</a>
    <div ng-view ></div>
</body>

*/