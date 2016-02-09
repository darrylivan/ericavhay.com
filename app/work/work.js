'use strict';

angular.module('myApp.work', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/portfolio', {
    templateUrl: 'work/portfolio.html',
    controller: 'WorkCtrl'
  }).
  when('/work/admin', {
    templateUrl: 'work/admin.html',
    controller: 'WorkAdminCtrl'
  }).
  when('/work/:workId', {
    templateUrl: 'work/work-detail.html',
    controller: 'WorkDetailCtrl'
  }).
  when('/work/update/:workId', {
    templateUrl: 'work/work-update.html',
    controller: 'WorkUpdateCtrl'
  }).
  when('/work/inquire/:workId', {
    templateUrl: 'work/work-purchase.html',
    controller: 'WorkDetailCtrl'
  });

}])
.controller('WorkCtrl', ['$scope', '$http', '$timeout', 'Work', function( $scope, $http, $timeout) {
  $scope.works = [];
  $scope.filters = {};
  $scope.styles = [ 'all' ];

  $http.get('http://www.ericavhay.com/portfolio/work/indexJson').success( function( data ) {
    $scope.works = data;
    $scope.runAnimation = false;

    for (var i = 0; i < data.length; i++)
    {
      var work = data[i];
      if ($scope.styles.indexOf( work.style ) == -1)
      {
        if (( typeof work.style !== 'undefined' ) && ( work.style !== '') && (work.archive !== 'true')  && (work.featured === 'true'))
        {
          $scope.styles.push( work.style );
        }
      }
    }

    $timeout(function() { $scope.runAnimation = true;}, 500);

  });

  $scope.filterOnStyle = function( style )
  {
    console.log('filtering on ' + style );
    if (style == 'all')
    {
      $scope.filters = {};
    }
    else
    {
      $scope.filters.style = style ;
    }

  }

  $scope.orderProp = '-date';

}])
  .controller('WorkAdminCtrl', ['$scope', '$http', '$timeout', 'Work', function( $scope, $http, $timeout) {
    $scope.works = [];
    $scope.filters = {};
    $scope.styles = [  ];

    $http.get('http://www.ericavhay.com/portfolio/work/indexJson').success( function( data ) {
      $scope.works = data;
      $scope.runAnimation = false;
      $scope.styles = [ 'all' ];

      for (var i = 0; i < data.length; i++)
      {
        var work = data[i];
        if ($scope.styles.indexOf( work.style ) == -1)
        {
          if (( typeof work.style !== 'undefined' ) && ( work.style !== '') && (work.archive !== 'true')  && (work.featured === 'true'))
          {
            $scope.styles.push( work.style );
          }
        }
      }

      $timeout(function() { $scope.runAnimation = true;}, 500);

    });

    $scope.filterOnStyle = function( style )
    {
      console.log('filtering on ' + style );
      if (style == 'all')
      {
        $scope.filters = {};
      }
      else
      {
        $scope.filters.style = style ;
      }

    }

    $scope.orderProp = '-date';

  }])
.controller('WorkDetailCtrl', ['$scope', '$routeParams', 'Work',
  function( $scope, $routeParams, Work ) {
  $scope.work = Work.get({workId: $routeParams.workId}, function( work ) {
    // do anything special, or just allow data bindings to do it...
  });


}])
  .controller('WorkUpdateCtrl', ['$scope', '$routeParams', 'Work', 'Styles', 'Galleries', '$filter',
    function( $scope, $routeParams, Work, Styles, Galleries, $filter ) {
      $scope.tryAutoPrice = false;
      $scope.supplement = 0;
      $scope.basePrice = 0;
      $scope.autoPrice = 'not set';
      $scope.styles = [];
      $scope.galleries = [];

      $scope.work = Work.get({workId: $routeParams.workId}, function( work ) {
        // do anything special, or just allow data bindings to do it...

        // calculate auto price
        const MIN_PRICE = 55.0;
        const EXPONENT_FACTOR = 1.35;
        const LINEAR_FACTOR = 18;

        var area = $scope.work.height * $scope.work.width;

        // work on square root of area...
        var sqArea = Math.sqrt(area);

        var psif = LINEAR_FACTOR;
        var price = Math.pow( sqArea, 2 )*EXPONENT_FACTOR + psif * sqArea + MIN_PRICE;
        price = Math.floor( price / 10  ) * 10;
        $scope.basePrice = price;
        $scope.autoPrice =  $scope.basePrice + $scope.supplement ;
      });

      $scope.updateAuto = function()
      {
        $scope.autoPrice =  $scope.basePrice + $scope.supplement ;
      }

      $scope.updateSoldDate = function()
      {
        if ($scope.work.sold)
        {
          // see if we need to set the sold date
          if ( ($scope.work.soldDate === '') || ($scope.work.soldDate === '0000-00-00'))
          {
            $scope.work.soldDate = $filter('date')(new Date(), "yyyy-MM-dd");
          }
        }
      }

      $scope.styles = Styles.query({}, function( styles ) {
        // do anything special, or just allow data bindings to do it...

      });


      $scope.galleries = Galleries.query({}, function( galleries ) {
        // do anything special, or just allow data bindings to do it...

      });





    }])
  .directive("masonry", function () {
    var NGREPEAT_SOURCE_RE = '<!-- ngRepeat: ((.*) in ((.*?)( track by (.*))?)) -->';
    return {
      compile: function(element, attrs) {
        // auto add animation to brick element
        var animation = attrs.ngAnimate || "'masonry'";
        var $brick = element.children();
        $brick.attr("ng-animate", animation);

        // generate item selector (exclude leaving items)
        var type = $brick.prop('tagName');
        var itemSelector = type+":not([class$='-leave-active'])";

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
              scope.$apply(function() {
                scope.$watchCollection(options.model, function (_new, _old) {
                  if(_new == _old) return;

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
  function($resource){
    return $resource('http://www.ericavhay.com/portfolio/work/viewJson/id/:workId', {}, {
      query: {method:'GET', params:{workId:'Work'}, isArray:true}
    });
  }]);

