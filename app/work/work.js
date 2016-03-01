'use strict';

angular.module('myApp.work', ['ngRoute', 'ngAnimate',])

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
        }).when('/work/labels', {
            templateUrl: 'work/labels.html',
            controller: 'WorkCtrl'
        }).when('/work/printLabels', {
            templateUrl: 'work/printLabels.html',
            controller: 'WorkCtrl'
        }).when('/work/:workId', {
            templateUrl: 'work/detail.html',
            controller: 'WorkCtrl'
        }).when('/work/update/:workId', {
            templateUrl: 'work/update.html',
            controller: 'WorkCtrl'
        }).when('/work/inquire/:workId', {
            templateUrl: 'work/work-purchase.html',
            controller: 'WorkCtrl'
        });

    }])
    .controller('WorkCtrl', ['$scope', '$timeout', '$routeParams', 'Work',
        'Style', 'Gallery', '$filter', '$http', 'SelectedWork', '$location', 'Printing',
        'WorkCollection',

        function ($scope, $timeout, $routeParams, Work, Style,
                  Gallery, $filter, $http, SelectedWork, $location, Printing,
                  WorkCollection) {
            /* for single work pages. */

            /* for index pages */
            $scope.filters = {};
            $scope.orderProp = '-date';
            $scope.includeArchive = false;
            $scope.includeSold = false;
            $scope.styles = WorkCollection.styles;
            $scope.styleNames = WorkCollection.styleNames;
            $scope.galleries = WorkCollection.galleries;
            $scope.works = WorkCollection.works;
            $scope.selected = WorkCollection.selectedWorks;

            /* to accumulate the total of sold paintings */
            $scope.soldTotal = function()
            {
                return WorkCollection.soldTotal;
            }


            $scope.selectImage = function () {
                $scope.$apply(function () {
                    $scope.work.selectImage();
                });
            }

            $scope.delete = function (work) {

                // if successfully deleted, remove from works list
                var onSuccess = function () {
                    console.log('onSuccess delete called')
                    if ($scope.works.length > 0) {
                        // mutates array to remove element
                        _.remove($scope.works, function (obj) {
                            var result = obj.id === work.id;
                            if (result) {
                                //console.log('found element to delete');
                            }
                            return result;
                        });
                    }

                }

                work.delete(onSuccess);
            }


            /* this saves selected works and tells the app we are in 'Printing' mode */
            $scope.createLabels = function () {
                // need to save selected works to the Work service
                var selected = [];
                for (var i = 0; i < $scope.works.length; i++) {
                    var work = $scope.works[i];
                    if (work.selected) {
                        selected.push(work);
                    }
                }
                console.log('saving ' + selected.length + ' works');
                WorkCollection.saveSelectedWorks(selected);
                Printing.print();
                $location.path('/work/printLabels');
            }

            /* after printing labels, this cancels 'Printing' mode */
            $scope.doneLabels = function () {
                Printing.cancelPrint();
                $location.path('/work/admin');
            };

            /* set the filter to the passed in style, or to ALL if 'all' is passed in */
            $scope.filterOnStyle = function (style) {
                console.log('filtering on ' + style);
                if (style.name == 'all') {
                    $scope.filters = {};
                }
                else {
                    $scope.filters.style = style.name;
                }
            }

            /* get a single work if 'id' is part of url */
            if ((typeof $routeParams.workId !== 'undefined') && ($routeParams.workId !== 'create')) {
                console.log('work.get  = ' + $routeParams.workId);
                $scope.work = Work.instance($routeParams.workId);

            }
            else {
                $scope.work = new Work;

            }
            $timeout(function () {
                $scope.runAnimation = true;
            }, 500);
        }
    ]);


/* Work Services */

/* abstract the work service */
var workServices = angular.module('myApp.workServices', ['ngResource']);

/* define a factory for the work resource to be used in other services */
workServices.factory('WorkResource', ['$resource', function ($resource) {
    return $resource('http://www.rest.ericavhay.com/portfolio/work/json/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
}

]);

workServices.factory('WorkCollection', ['WorkResource', 'Work', 'StyleCollection',
    'GalleryCollection',
    function (WorkResource, Work, StyleCollection, GalleryCollection) {

        var collection = {};
        collection.styles = StyleCollection.styles;

        collection.styleNames = [];
        collection.galleries = GalleryCollection.galleries;
        collection.works = [];
        collection.soldTotal = 0;

        collection.initialize = function () {
            // get index ..

            /* query for all the works */
            WorkResource.query(function (data) {
                console.log('got result from resource ' + data.length);
                for (var i = 0; i < data.length; i++) {
                    var work = data[i];
                    var w = new Work();
                    w.initialize(work);
                    collection.works.push(w);
                    if (collection.styleNames.indexOf(work.style) == -1) {
                        if (( typeof work.style !== 'undefined' ) && ( work.style !== '') &&
                            (work.archive !== true) && (work.featured === true)) {
                            collection.styleNames.push(work.style);
                        }
                    }
                    if (work.sold) {
                        collection.soldTotal += parseInt(work.price);
                    }
                    work.selected = false;
                }
                collection.setStyles();
            });

        };

        /* loop over current works and extract the list of styles */
        collection.setStyles = function () {
            var tmp = [{name: 'all'}];

            for (var i = 0; i < collection.styleNames.length; i++) {
                for (var j = 0; j < collection.styles.length; j++) {
                    var name = collection.styleNames[i];
                    var style = collection.styles[j];
                    if (style.name === name) {
                        tmp.push(style)
                    }
                }
            }
            if (tmp.length > 1) {
                collection.styles = tmp;
            }
        }
        collection.selectedWorks = [];
        collection.saveSelectedWorks = function (works) {
            // this pushes all the elements...
            [].push.apply(collection.selectedWorks, works);
        };

        collection.initialize();
        return collection;
    }]);


workServices.factory('Work', ['WorkResource', '$filter', 'Gallery', '$timeout', 'Style', 'SelectedWork',
    '$http', '$cacheFactory',
    function (WorkResource, $filter, Gallery, $timeout, Style, SelectedWork, $http, $cacheFactory) {

        function Work(id) {

            var self = this;

            this.initialize = function (data) {

                /* for autopricing */
                self.supplement = 0;
                self.imageFile = null;
                self.imageUrl = null;
                self.basePrice = 0;
                //self.autoPrice = 'not set';
                self.date = $filter('date')(new Date(), "yyyy-MM-dd");
                self.updated = false;
                self.imageFile = false;

                angular.extend(self, data);

                if ((self.galleryId !== null) && (typeof this.galleryId !== 'undefined')) {
                    // get the gallery
                    self.gallery = Gallery.instance( self.galleryId );
                }
                if (!angular.isUndefined(self.id))
                {
                    Work.cache.put(self.id, self);
                }
            }

            /* calculate the  autoprice,  */
            this.autoPrice = function () {
                // calculate auto price after work is loaded.
                var MIN_PRICE = 55.0;
                var EXPONENT_FACTOR = 1.35;
                var LINEAR_FACTOR = 30;

                var area = self.height * self.width;
                // work on square root of area...
                var sqArea = Math.sqrt(area);

                var psif = LINEAR_FACTOR;
                var price = Math.pow(sqArea, 2) * EXPONENT_FACTOR + psif * sqArea + MIN_PRICE;
                price = Math.floor(price / 10) * 10;
                self.basePrice = price;
                var result = parseInt(self.basePrice);
                if (typeof self.supplement === 'integer') {
                    result = parseInt(self.basePrice) + parseInt(self.supplement);
                }
                return result;
            };

            /* when sold is set to true, need to set the sold date to today if not already set */
            this.updateSoldDate = function () {
                if (self.sold) {
                    // see if we need to set the sold date
                    if ((self.soldDate === '') ||
                        (typeof self.soldDate === 'undefined') ||
                        (self.soldDate === '0000-00-00')) {
                        self.soldDate = $filter('date')(new Date(), "yyyy-MM-dd");
                    }
                }
            }


            /* save method for model */
            this.save = function () {

                self.saving = true;
                console.log('saving');
                if (self.id) {
                    // update existing.
                    WorkResource.update({id: self.id}, self, function (work) {
                        if (typeof work.name !== 'undefined') {
                            self.changed = false;
                        }
                        self.saving = self.setImage();
                        /* check for new image */

                    });
                } else {
                    // create new
                    /*
                    todo: this does not work super nice since I am creating a new
                    work resource based on this object, it saves it correctly,
                    but does not change 'self'.  So, I have to re-initialize
                    self based on the response.  not terrible, but not pretty.

                     */
                    var resource = new WorkResource(self);
                    resource.$save().then(function (response) {
                        if (typeof response.error !== 'undefined') {
                            alert('error in saving ' + response.error);
                            console.log(response);
                        }
                        else {
                            console.log('saved successfully.');
                            console.log(response);
                            self.changed = false;
                            self.initialize(response);
                        }
                        self.saving = false;
                    });
                }
            }


            /* delete model for method */
            this.delete = function (onSuccess) {
                if (confirm('are you sure you want to delete ' + self.name)) {
                    self.saving = true;
                    WorkResource.delete({id: self.id}, function (response) {
                        console.log(response);
                        if (response.result === 'success') {
                            console.log('typeof onSuccess ' + typeof onSuccess);
                            if (typeof onSuccess !== 'undefined') {
                                onSuccess();
                            }
                            self.initialize({});
                        }
                        self.saving = false;
                    })

                }
            }

            /* notify the controller that the model has changed, and it can be saved */
            this.change = function (changed) {
                if (typeof changed == 'undefined') {
                    changed = true;
                }
                self.changed = changed;
            }


            /* this enables 'save' button, so you can save the new image after you select it */
            this.selectImage = function () {
                self.changed = true;
                self.imageFile = document.getElementById('file').files[0];
            };

            /* this saves the image selected to the model - if any */
            this.setImage = function () {

                var saving = false;
                if (self.imageFile && this.id) {

                    self.saving = true;
                    saving = true;

                    console.log('image file set ');
                    var fd = new FormData();

                    fd.append("file", self.imageFile);
                    var uploadUrl = 'https://www.rest.ericavhay.com/portfolio/work/setImageJson/id/' +
                        self.id;

                    $http({
                        method: 'post',
                        url: uploadUrl,
                        data: fd,
                        withCredentials: true,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    })
                        .then(
                            function (response) {

                                console.log('returned data ');
                                console.log(response.data);
                                self.initialize(response.data);
                                self.updated = true;
                                self.saving = false;
                            }
                            ,
                            function () {
                                self.saving = false;
                                alert('set image failed.')
                            }
                        );
                } else {
                    console.log('image file not set');
                }

                return saving;

            };

            if (typeof id !== 'undefined') {
                this.id = id;
                console.log('requesting id ' + this.id);
                WorkResource.get({id: this.id}, self, function (data) {
                    //console.log('retrieved work ');
                    console.log(data);
                    self.initialize(data);
                });
            }
            else {
                var data = {};
                self.initialize(data);
            }

            return this;
        }
        Work.cache = new $cacheFactory('Work');
        Work.instance = function( id )
        {
            var result = Work.cache.get( id );
            if (angular.isUndefined(result))
            {
                console.log('created new work for id ' + id);
                result = new Work( id );
            }
            return result;
        }

        return Work;
    }])
;


/* this service allows the selected works to be passed between views */
workServices.factory('SelectedWork',
    function () {

        var service = {};
        service.saveSelectedWorks = function (works) {
            this.works = works;
        };
        service.selectedWorks = function () {
            return this.works;
        }
        return service;
    }
);
