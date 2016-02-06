/**
 * Created by admin on 2/5/16.
 */
'use strict';

angular.module('myApp.footer', [])

  .controller('FooterCtrl', ['$scope', function( $scope) {
    $scope.date = new Date();
  }]);
