/**
 * Created by admin on 2/9/16.
 */



angular.module('myApp.style', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.
      when('/style/admin', {
        templateUrl: 'style/admin.html',
        controller: 'StyleCtrl'
      }).
      when('/style/update/:styleId', {
        templateUrl: 'style/update.html',
        controller: 'StyleCtrl'
      });

    }])
    .controller('StyleCtrl', ['$scope', '$timeout', 'Style', function( $scope, $timeout, Style) {
      $scope.style = {};
      $scope.styles = [ 'all' ];

      Style.query( function( data ) {
        $scope.styles = data;

        $timeout(function() { $scope.runAnimation = true;}, 500);

      });

    }])

/* Style Services */
var styleServices = angular.module('myApp.styleServices', ['ngResource']);
styleServices.factory('Style', ['$resource',
  function($resource){
    return $resource('http://www.ericavhay.com/portfolio/style/json/:id', {id: '@id'}, {
      update: {
        method:'PUT'
      }
    });
  }]);


