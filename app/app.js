'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'myApp.animations',
  'myApp.menu',
  'myApp.work',
  'myApp.gallery',
  'myApp.version',
  'myApp.workServices'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/work/:workId', {
    templateUrl: 'work/work-detail.html',
    controller: 'WorkDetailCtrl'
  }).
  when('/work/inquire/:workId', {
    templateUrl: 'work/work-purchase.html',
    controller: 'WorkDetailCtrl'
  }).
  otherwise({redirectTo: '/portfolio'});
}]);
