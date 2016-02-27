'use strict';

describe('myApp.gallery module', function() {

  beforeEach(module('myApp.gallery'));

  describe('gallery controller', function(){

    it('should ....', inject(function($controller, $rootScope, Gallery) {
      //spec body
      var scope = $rootScope.$new();// get a child scope
      var galleryCtrl = $controller('GalleryCtrl', {$scope: scope , Gallery: Gallery});

      expect(galleryCtrl).toBeDefined();
    }));

  });
});