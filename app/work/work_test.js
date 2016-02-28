'use strict';

describe('myApp.work module', function() {

  beforeEach(module('myApp.work', '$rootScope', 'Work'));

  describe('work controller', function(){

    it('should ....', inject(function($controller, $rootScope, Work) {
      //spec body
      var scope = $rootScope.$new();// get a child scope
      var workCtrl = $controller('WorkCtrl', {$scope: scope , Work: Work});

      expect(workCtrl).toBeDefined();
    }));

  });
});