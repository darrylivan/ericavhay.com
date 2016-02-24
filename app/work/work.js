'use strict';

angular.module('myApp.work', ['ngRoute', 'ngAnimate'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/portfolio', {
      templateUrl: 'work/portfolio.html',
      controller: 'WorkCtrl'
    }).when('/work/admin', {
      templateUrl: 'work/admin.html',
      controller: 'WorkCtrl'
    }).when('/work/create', {
      templateUrl: 'work/update.html',
      controller: 'WorkCtrl'
    }).when('/work/sold', {
      templateUrl: 'work/sold.html',
      controller: 'WorkCtrl'
    }).when('/work/:workId', {
      templateUrl: 'work/work-detail.html',
      controller: 'WorkCtrl'
    }).when('/work/update/:workId', {
      templateUrl: 'work/update.html',
      controller: 'WorkCtrl'

    }).when('/work/inquire/:workId', {
      templateUrl: 'work/work-purchase.html',
      controller: 'WorkCtrl'
    });

  }])
  .controller('WorkCtrl', ['$scope', '$timeout', '$routeParams', 'Work', 'Style', 'Gallery', '$filter',
    function ($scope, $timeout, $routeParams, Work, Style, Gallery, $filter) {
      /* for single work pages. */
      $scope.work = new Work;
      $scope.gallery = {};
      $scope.changed = false;

      $scope.tryAutoPrice = false;
      $scope.supplement = 0;
      $scope.basePrice = 0;
      $scope.autoPrice = 'not set';

      /* for index pages */
      $scope.works = [];
      $scope.filters = {};
      $scope.styles = [];
      $scope.styleNames = [];
      $scope.orderProp = '-date';
      $scope.galleries = [];
      $scope.updated = false;

      /* to accumulate the total of sold paintings */
      $scope.soldTotal = 0;

      Work.query(function (data) {
        $scope.works = data;
        $scope.runAnimation = false;
        $scope.styleNames = [];
        for (var i = 0; i < data.length; i++) {
          var work = data[i];
          if ($scope.styleNames.indexOf(work.style) == -1) {
            if (( typeof work.style !== 'undefined' ) && ( work.style !== '') &&
              (work.archive !== true) && (work.featured === true)) {
              $scope.styleNames.push(work.style);
            }
          }

          if (work.sold) {
            $scope.soldTotal += parseInt(work.price);
          }
        }

        $timeout(function () {
          $scope.runAnimation = true;
        }, 500);
        $scope.setStyles();

        $scope.updated = true;

      });

      $scope.setStyles = function()
      {
        var tmp = [{name: 'all'}];

        for (var i = 0; i < $scope.styleNames.length; i++)
        {
          for (var j = 0; j < $scope.styles.length; j++)
          {
            var name = $scope.styleNames[i];
            var style = $scope.styles[j];
            if (style.name === name)
            {
              tmp.push( style )
            }
          }

        }
        if (tmp.length > 1)
        {
          $scope.styles = tmp;
        }
      }
      $scope.filterOnStyle = function (style) {
        console.log('filtering on ' + style);
        if (style.name == 'all') {
          $scope.filters = {};
        }
        else {
          $scope.filters.style = style.name;
        }
      }

      if ((typeof $routeParams.workId !== 'undefined') && ($routeParams.workId !== 'create')) {
        console.log('workid = ' + $routeParams.workId);
        $scope.work = Work.get({id: $routeParams.workId}, function (work) {

          // get the gallery
          $scope.gallery = Gallery.get({id: work.galleryId}, function ( gallery ) {

          });

          console.log(work);

          $scope.updateAuto();
          $scope.updated = true;

        });
      }


      /* when supplement changes, calculate the new autoprice */
      $scope.updateAuto = function () {
        // calculate auto price after work is loaded.
        const MIN_PRICE = 55.0;
        const EXPONENT_FACTOR = 1.35;
        const LINEAR_FACTOR = 18;

        var area = $scope.work.height * $scope.work.width;
        // work on square root of area...
        var sqArea = Math.sqrt(area);

        var psif = LINEAR_FACTOR;
        var price = Math.pow(sqArea, 2) * EXPONENT_FACTOR + psif * sqArea + MIN_PRICE;
        price = Math.floor(price / 10) * 10;
        $scope.basePrice = price;
        $scope.autoPrice = $scope.basePrice + $scope.supplement;
      }

      /* when sold is set to true, need to set the sold date to today if not already set */
      $scope.updateSoldDate = function () {
        if ($scope.work.sold) {
          // see if we need to set the sold date
          if (($scope.work.soldDate === '') || ($scope.work.soldDate === '0000-00-00')) {
            $scope.work.soldDate = $filter('date')(new Date(), "yyyy-MM-dd");
          }
        }
        $scope.change();
      }

      $scope.styles = Style.query({}, function (styles) {
        // do anything special, or just allow data bindings to do it...
        console.log('styles ');
        console.log($scope.styles);
        $scope.setStyles();

      });


      $scope.galleries = Gallery.query({}, function (galleries) {
        // do anything special, or just allow data bindings to do it...

      });

      $scope.save = function (work) {
        if ($scope.work.id) {
          // update existing.
          console.log('sending update...');
          Work.update({id: $scope.work.id}, $scope.work, function (work) {
            if (typeof work.name !== 'undefined') {
              $scope.changed = false;
            }
          });
        } else {
          // create new
          console.log('sending create...');
          $scope.work.$save().then(function (response) {
            if (typeof response.name !== 'undefined') {
              $scope.changed = false;
            }
          });
        }
      }

      $scope.change = function () {
        $scope.changed = true;
        $scope.updateAuto();
      }

    }])
  .directive("masonry", function () {

    /* set up the masonry stuff */
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
                  }, 500);
                });
              });
            }

            /* call this after a bit to reformat after images are loaded
             need to update this to actually wait for images loaded!
             * */
            setTimeout(function () {
              element.masonry("reload");
            }, 500);


          });
        };
      }
    };
  });


/* Work Services */
var workServices = angular.module('myApp.workServices', ['ngResource']);
workServices.factory('Work', ['$resource',
  function ($resource) {
    return $resource('http://www.rest.ericavhay.com/portfolio/work/json/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }]);

