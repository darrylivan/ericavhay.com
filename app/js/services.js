/**
 * Created by admin on 2/3/16.
 */


/* Work Services */
var workServices = angular.module('myApp.workServices', ['ngResource']);
workServices.factory('Work', ['$resource',
  function($resource){
    return $resource('work/work-:workId.json', {}, {
      query: {method:'GET', params:{workId:'Work'}, isArray:true}
    });
  }]);
