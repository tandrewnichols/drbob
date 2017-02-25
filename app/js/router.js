angular.module('app').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {})
    .when('/info', {})
    .when('/about', {})
    .when('/products', {});
});
