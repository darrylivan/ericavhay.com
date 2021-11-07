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
var styleServices = angular.module('myApp.styleServices', ['ngResource'])
.factory('StyleResource', ['$resource',
    function ($resource) {
        return $resource('https://www.rest.ericavhay.com/portfolio/style/json/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    }])
    .factory('StyleCollection', ['StyleResource', 'Work',
        'Style',
        function (StyleResource, Work, Style ) {

            var collection = {};
            collection.styles = [];

            collection.initialize = function () {

                /* query for all the styles */
                StyleResource.query(function (data) {
                    // randomize the order.
                    for (var i = 0; i < data.length; i++) {
                        var style = new Style();
                        style.initialize(data[i]);
                        collection.styles.push(style);
                    }
                });

            }


            collection.initialize();

            return collection;
        }
    ])

styleServices.factory('Style', ['StyleResource', 'WorkResource', '$cacheFactory',

    function (StyleResource, WorkResource, $cacheFactory) {

        function Style(id) {

            var self = this;

            this.initialize = function (data) {
                self.id = null;
                self.updated = false;
                angular.extend(self, data);
                if (!angular.isUndefined(self.id))
                {
                    Style.cache.put(self.id, self);
                }

            }


            if (typeof id !== 'undefined') {
                this.id = id;
                console.log('requesting id ' + this.id);

                StyleResource.get({id: this.id}, self, function (data) {
                    //console.log('retrieved work ');
                    console.log(data);
                    self.initialize(data);
                });
            }
            else {
                var data = {};
                self.initialize(data);
            }

        }
        Style.cache = new $cacheFactory('Style');
        Style.instance = function( id )
        {
            var result = Style.cache.get(id);
            if (angular.isUndefined(result))
            {
                result = new Style( id );
            }
            return result;
        }

        return Style;
    }
]);



