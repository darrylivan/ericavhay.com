'use strict';


/* services */

angular.module('myApp.gallery', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/galleries', {
        templateUrl: 'gallery/galleries.html',
        controller: 'GalleryCtrl'
      })
      .when('/venues', {
        templateUrl: 'gallery/galleries.html',
        controller: 'GalleryCtrl'
      })
      .when('/contact', {
        templateUrl: 'gallery/contact.html',
        controller: 'GalleryCtrl'
      })
      .when('/gallery/update/:galleryId', {
        templateUrl: 'gallery/update.html',
        controller: 'GalleryCtrl'
      })
      .when('/gallery/admin', {
        templateUrl: 'gallery/admin.html',
        controller: 'GalleryCtrl'
      })
      .when('/gallery/:galleryId', {
        templateUrl: 'gallery/gallery-detail.html',
        controller: 'GalleryCtrl'
      });

  }])
  .controller('GalleryCtrl', ['$scope', '$timeout', '$routeParams', 'Gallery',
    function ($scope, $timeout, $routeParams, Gallery) {
      $scope.galleries = [];
      $scope.gallery = {};

      $scope.runAnimation = false;

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

      Gallery.query(function (data) {
        $scope.galleries = data;

        // randomize the order.
        $scope.galleries = shuffle($scope.galleries);

        // now, run any animations.
        $timeout(function () {
          $scope.runAnimation = true;
        });
      });

      if ('undefined' != typeof $routeParams.galleryId) {

        $scope.gallery = Gallery.get({id: $routeParams.galleryId}, function (gallery) {
          // do anything special, or just allow data bindings to do it...
          console.log(gallery);
          if (typeof gallery.works !== 'undefined') {

            var active = true;
            for (var i = 0; i < gallery.works.length; i++) {
              gallery.works[i]['active'] = active;
              active = false;
            }
            $scope.slides = gallery.works;

          }

          return gallery;
        });
      }


      $scope.save = function (gallery) {
        if ($scope.gallery.id) {
          // update existing.
          console.log('sending update...');
          Gallery.update({id: $scope.gallery.id}, $scope.gallery);
        } else {
          // create new
          $scope.gallery.$save().then(function (response) {
            $scope.gallery.push(response)
          });
        }
      }


      /* for slider */
      $scope.myInterval = 5000;
      $scope.noWrapSlides = false;
      $scope.showCaptionBackground = false;
      $scope.captionBackground = function (show) {
        $scope.showCaptionBackground = show;
      }
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
              //element.masonry('destroy')
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
              element.css('opacity', '1.0');
            }, 1500);


          });
        };
      }
    };
  });


var galleryServices = angular.module('myApp.galleryServices', ['ngResource', 'ngAnimate']);
galleryServices.factory('Gallery', ['$resource',
  function ($resource) {
    return $resource('http://www.rest.ericavhay.com/portfolio/gallery/json/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }]);
