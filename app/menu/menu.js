'use strict';

angular.module('myApp.menu', ['ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {

    }])

    .controller('menuCtrl', ['$scope', '$location', 'Printing', function ($scope, $location, Printing) {

        /* for controlling collapsable dropdown on mobile */
        $scope.navCollapsed = true;
        $scope.toggleNav = function (href) {
            $scope.navCollapsed = !$scope.navCollapsed;
            if (typeof href !== 'undefined') {
                $location.path( href );
            }
        }

    /* for setting active class */
        $scope.getClass = function (path) {
            if ($location.path().substr(0, path.length) === path) {
                return 'active';
            } else {
                return '';
            }
        }

        /* for controlling dropdown on main menu */
        $scope.status = {
            isopen: false
        };
        $scope.toggleDropdown = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };

        $scope.printing = function()
        {
            return Printing.printing;
        }


    }]);

