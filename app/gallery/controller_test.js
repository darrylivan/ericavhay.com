/**
 * Created by darry on 2/27/2016.
 */
describe('testing controllers', function(){
    var mockDataSvc, rootScope, scope, passPromise, GalleryCtrl;

    beforeEach(function(){
        module(function($provide){
            $provide.factory('dataSvc', ['$q', function($q){
                function save(data){
                    if(passPromise){
                        return $q.when();
                    } else {
                        return $q.reject();
                    }
                }

                return {
                    save: save
                };
            }]);
        });

        module('myApp.gallery');
    });

    beforeEach(inject(function($rootScope, $controller, dataSvc){
        rootScope = $rootScope;
        scope = $rootScope.$new();
        mockDataSvc = dataSvc;
        mockRoute = {};
        mockTimeout = {};
        spyOn(mockDataSvc, 'save').and.callThrough();
    }));

    describe('galleryCtrl', function(){
        beforeEach(inject(function($controller){
            galleryCtrl = $controller('GalleryCtrl', {
                $scope: scope,
                $timeout: mockTimeout,
                $routeParams: mockRoute,
                Gallery: mockDataSvc
            });
        }));

        it('should have assigned pattern to number pattern', function(){
            expect(scope.gallery).toBeDefined();
            //expect(scope.numberPattern.test("100")).toBe(true);
            //expect(scope.numberPattern.test("100aa")).toBe(false);
        });

        it('should call save method on dataSvc on calling saveData', function(){
            scope.bookDetails = {
                bookId: 1,
                name: "Mastering Web application development using AngularJS",
                author: "Peter and Pawel"
            };
            scope.bookForm = {
                $setPristine: jasmine.createSpy('$setPristine')
            };
            passPromise = true;
            scope.saveData();
            scope.$digest();

            expect(mockDataSvc.save).toHaveBeenCalled();
            expect(scope.bookDetails).toEqual({});
            expect(scope.bookForm.$setPristine).toHaveBeenCalled();
        });
    });


});