'use strict';

angular.module('myApp.gallery', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/galleries', {
    templateUrl: 'gallery/galleries.html',
    controller: 'galleryCtrl'
  });
}])

.controller('galleryCtrl', [function() {

}]);