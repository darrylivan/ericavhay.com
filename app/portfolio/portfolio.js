'use strict';

angular.module('myApp.portfolio', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/portfolio', {
    templateUrl: 'portfolio/portfolio.html',
    controller: 'PortfolioCtrl'
  });

}])

.controller('PortfolioCtrl', function( $scope, $http) {
  $scope.works = [];
  $http.get('portfolio/works.json').success( function( data ) {
    $scope.works = data;
  });

  $scope.orderProp = '-date';
});