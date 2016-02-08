/**
 * Created by admin on 2/8/16.
 */
'use strict';

angular.module('myApp.site', ['ngRoute', 'ngAnimate'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'SiteCtrl'
    });

  }])
  .controller('SiteCtrl', ['$scope', '$timeout',
    function( $scope, $timeout) {
    $scope.runAnimation = false;

    // now, run any animations.
    $timeout(function() { $scope.runAnimation = true;});

  }]);