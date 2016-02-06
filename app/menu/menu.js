'use strict';

angular.module('myApp.menu', ['ui.bootstrap'])

  .config(['$routeProvider', function($routeProvider) {

  }])

  .controller('menuCtrl', function($scope) {
    $scope.toggled = function(open) {

    };

    $scope.hoverNav = false;
    $scope.setHover = function( val )
    {
      $scope.hoverNav = val;
    }

    $scope.status = {
      isopen: false
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.name = ['e', 'r', 'i', 'c', 'a', ' ', 'v', 'h', 'a', 'y'];



  });