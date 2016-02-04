'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'myApp.animations',
  'myApp.menu',
  'myApp.portfolio',
  'myApp.gallery',
  'myApp.version',
  'myApp.workServices'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/work/:workId', {
    templateUrl: 'portfolio/work-detail.html',
    controller: 'WorkCtrl'
  }).
  when('/work/inquire/:workId', {
    templateUrl: 'portfolio/work-purchase.html',
    controller: 'WorkCtrl'
  }).
  otherwise({redirectTo: '/portfolio'});
}]);
