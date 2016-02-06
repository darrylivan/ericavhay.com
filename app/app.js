'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngTouch',
  'ui.bootstrap',
  'myApp.animations',
  'myApp.menu',
  'myApp.work',
  'myApp.gallery',
  'myApp.version',
  'myApp.workServices',
  'myApp.galleryServices',
  'myApp.footer'
]).
config(['$routeProvider', function($routeProvider) {

  // set default route when unrecognized...
  $routeProvider.
  otherwise({redirectTo: '/portfolio'});
}]);
