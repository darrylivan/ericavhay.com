/**
 * Created by admin on 2/5/16.
 */
'use strict';

angular.module('myApp.footer', [])

    .controller('footerCtrl', ['$scope', 'Printing', function ($scope, Printing) {
        $scope.date = new Date();
        $scope.printing = function()
        {
            return Printing.printing;
        }

    }]);
