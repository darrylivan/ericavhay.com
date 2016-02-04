'use strict';

angular.module('myApp.portfolio', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/portfolio', {
    templateUrl: 'portfolio/portfolio.html',
    controller: 'PortfolioCtrl'
  });

}])
.controller('PortfolioCtrl', ['$scope', '$http', 'Work', function( $scope, $http) {
  $scope.works = [];
  $http.get('work/works.json').success( function( data ) {
    $scope.works = data;
  });

  $scope.showCaption = function(work) {
    work.showCaption = true;
  }

  $scope.hideCaption = function(work) {
    work.showCaption = false;
  }

  $scope.orderProp = '-date';
}])
.controller('WorkCtrl', ['$scope', '$routeParams', 'Work',
  function( $scope, $routeParams, Work ) {
  $scope.work = Work.get({workId: $routeParams.workId}, function( work ) {
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
              element.masonry('destroy')
            });

            if (options.model) {
              scope.$apply(function() {
                scope.$watchCollection(options.model, function (_new, _old) {
                  if(_new == _old) return;

                  // Wait inside directives to render
                  setTimeout(function () {
                    element.masonry("reload");
                  });
                });
              });
            }
          });
        };
      }
    };
  });



