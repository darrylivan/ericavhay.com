'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'wu.masonry',
  'myApp.menu',
  'myApp.portfolio',
  'myApp.gallery',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/portfolio'});
}]);
