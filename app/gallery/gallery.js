'use strict';


/* services */

var galleryServices = angular.module('myApp.galleryServices', ['ngResource']);
galleryServices.factory('Gallery', ['$resource',
  function($resource){
    return $resource('http://www.ericavhay.com/portfolio/gallery/viewJson/id/:galleryId', {}, {
      query: {method:'GET', params:{galleryId:'Gallery'}, isArray:true}
    });
  }]);

angular.module('myApp.gallery', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/galleries', {
      templateUrl: 'gallery/galleries.html',
      controller: 'GalleryCtrl'
    }).when('/gallery/:galleryId', {
      templateUrl: 'gallery/gallery-detail.html',
      controller: 'GalleryDetailCtrl'
    });

  }])
  .controller('GalleryCtrl', ['$scope', '$http', 'Gallery',
    function ($scope, $http, Gallery) {
      $scope.galleries = [];

      /* for shuffling the order of the galleries */
      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      };

      $http.get('http://www.ericavhay.com/portfolio/gallery/indexJson').success(function (data) {
        $scope.galleries = data;

        // randomize the order.
        $scope.galleries = shuffle($scope.galleries);
      });

      //$scope.orderProp = 'name';
    }])
  .controller('GalleryDetailCtrl', ['$scope', '$routeParams', 'Gallery',
    function( $scope, $routeParams, Gallery ) {
      $scope.gallery = Gallery.get({galleryId: $routeParams.galleryId}, function( gallery ) {
        // do anything special, or just allow data bindings to do it...
        console.log( gallery);
        var active = true;
        for (var i = 0; i < gallery.works.length; i++)
        {
          gallery.works[i]['active'] = active;
          active = false;
        }
        $scope.slides = gallery.works;

        return gallery;
      });


      /* for slider */
      $scope.myInterval = 5000;
      $scope.noWrapSlides = false;


    }])
  .directive("masonry", function () {
    var NGREPEAT_SOURCE_RE = '<!-- ngRepeat: ((.*) in ((.*?)( track by (.*))?)) -->';
    return {
      compile: function (element, attrs) {
        // auto add animation to brick element
        var animation = attrs.ngAnimate || "'masonry'";
        var $brick = element.children();
        $brick.attr("ng-animate", animation);

        // generate item selector (exclude leaving items)
        var type = $brick.prop('tagName');
        var itemSelector = type + ":not([class$='-leave-active'])";

        return function (scope, element, attrs) {
          var options = angular.extend({
            itemSelector: itemSelector
          }, scope.$eval(attrs.masonry));

          // try to infer model from ngRepeat
          if (!options.model) {
            var ngRepeatMatch = element.html().match(NGREPEAT_SOURCE_RE);
            if (ngRepeatMatch) {
              options.model = ngRepeatMatch[4];
            }
          }

          // initial animation
          element.addClass('masonry');

          // Wait inside directives to render
          setTimeout(function () {
            element.masonry(options);

            element.on("$destroy", function () {
              element.masonry('destroy')
            });

            if (options.model) {
              scope.$apply(function () {
                scope.$watchCollection(options.model, function (_new, _old) {
                  if (_new == _old) return;

                  // Wait inside directives to render
                  setTimeout(function () {
                    element.masonry("reload");
                  });
                });
              });
            }

            /* call this after a bit to reformat after images are loaded
             need to update this to actually wait for images loaded!
             * */
            setTimeout(function () {
              element.masonry("reload");
            }, 1500);


          });
        };
      }
    };
  });

