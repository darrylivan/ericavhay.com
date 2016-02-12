/**
 * Created by admin on 2/8/16.
 */
'use strict';

angular.module('myApp.site', ['ngRoute', 'ngAnimate'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'SiteCtrl'
      });

  }])
  .controller('SiteCtrl', function ($scope,
                                    USER_ROLES,
                                    AuthService) {

    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
    };


  })
