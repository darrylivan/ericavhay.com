'use strict';

angular.module('myApp.menu', ['ui.bootstrap'])

  .config(['$routeProvider', function($routeProvider) {

  }])

  .controller('menuCtrl', function($scope) {
    $scope.toggled = function(open) {

    };

    $scope.status = {
      isopen: false
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

  });