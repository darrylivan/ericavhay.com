/**
 * Created by admin on 2/2/16.
 */

angular.module('workFilters', []).filter('archive', function() {
  return function(input) {
    return input.archive;
  };
});