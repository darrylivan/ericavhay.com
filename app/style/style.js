/**
 * Created by admin on 2/9/16.
 */


/* Style Services */
var styleServices = angular.module('myApp.styleServices', ['ngResource']);
styleServices.factory('Style', ['$resource',
  function($resource){
    return $resource('http://www.ericavhay.com/portfolio/style/viewJson/id/:styleId', {}, {
      query: {method:'GET', params:{styleId:'Style'}, isArray:true}
    });
  }]);
styleServices.factory('Styles', ['$resource',
  function($resource){
    return $resource('http://www.ericavhay.com/portfolio/style/indexJson/', {}, {
      query: {method:'GET',  isArray:true}
    });
  }]);
