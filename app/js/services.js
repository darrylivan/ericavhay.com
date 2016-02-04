/**
 * Created by admin on 2/3/16.
 */



var galleryServices = angular.module('myApp.galleryServices', ['ngResource']);
workServices.factory('Gallery', ['$resource',
  function($resource){
    return $resource('gallery/gallery-:galleryId.json', {}, {
      query: {method:'GET', params:{galleryId:'Gallery'}, isArray:true}
    });
  }]);