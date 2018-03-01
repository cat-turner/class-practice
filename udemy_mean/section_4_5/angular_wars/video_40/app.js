angular.module('myApp',['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/main.html',
        controller: 'MyController',
        controllerAs: 'vm'
    }).when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'AboutController',
        controllerAs: 'vm'
    });
}