'use strict';

angular.module('myApp.menu', ['ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {

    }])

    .controller('menuCtrl', function ($scope, $location) {
        $scope.navCollapsed = true;
        $scope.toggleNav = function (href) {
            $scope.navCollapsed = !$scope.navCollapsed;
            console.log('toggled nav collapse');
            if (typeof href !== 'undefined') {

                console.log(href);
                $location.path( href );
            }
        }

        $scope.status = {
            isopen: false
        };

        $scope.toggleDropdown = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };

        $scope.name = ['e', 'r', 'i', 'c', 'a', ' ', 'v', 'h', 'a', 'y'];


    });