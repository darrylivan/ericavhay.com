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
    .controller('SiteCtrl', ['$scope',
        'USER_ROLES',
        'AuthService', 'Printing', function ($scope,
                                             USER_ROLES,
                                             AuthService, Printing) {

            $scope.currentUser = null;
            $scope.userRoles = USER_ROLES;
            $scope.isAuthorized = AuthService.isAuthorized;
            $scope.printing = Printing.printing;

            $scope.setCurrentUser = function (user) {
                $scope.currentUser = user;
            };


        }])


/* Work Services */
var siteServices = angular.module('myApp.siteServices', ['ngResource']);

siteServices.factory('Printing',
    function () {

        var service = {};
        service.printing = false;
        service.print = function () {
            this.printing = true;
        };
        service.cancelPrint = function () {
            this.printing = false;
        }

        return service;
    }
);


