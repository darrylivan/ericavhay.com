'use strict';


/* services */

angular.module('myApp.gallery', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/galleries', {
                templateUrl: 'gallery/galleries.html',
                controller: 'GalleryCtrl'
            })
            .when('/venues', {
                templateUrl: 'gallery/galleries.html',
                controller: 'GalleryCtrl'
            })
            .when('/contact', {
                templateUrl: 'gallery/contact.html',
                controller: 'GalleryCtrl'
            })
            .when('/gallery/update/:galleryId', {
                templateUrl: 'gallery/update.html',
                controller: 'GalleryCtrl'
            })
            .when('/gallery/admin', {
                templateUrl: 'gallery/admin.html',
                controller: 'GalleryCtrl'
            })
            .when('/gallery/:galleryId', {
                templateUrl: 'gallery/gallery-detail.html',
                controller: 'GalleryCtrl'
            });

    }])
    .controller('GalleryCtrl', ['$scope', '$timeout', '$routeParams', 'Gallery', 'GalleryCollection',
        function ($scope, $timeout, $routeParams, Gallery, GalleryCollection) {
            $scope.galleries = [];
            $scope.gallery = {};

            $scope.runAnimation = false;

            $scope.galleries = GalleryCollection.galleries;

            if ('undefined' != typeof $routeParams.galleryId) {

                $scope.gallery = new Gallery($routeParams.galleryId);

            }

            /*
            $scope.save = function (gallery) {
                if ($scope.gallery.id) {
                    // update existing.
                    console.log('sending update...');
                    //Gallery.save({id: $scope.gallery.id}, $scope.gallery);
                    $scope.gallery.save();
                } else {
                    // create new
                    $scope.gallery.$save().then(function (response) {
                        $scope.gallery.push(response)
                    });
                }
            }
            */

            $timeout(function () {
                $scope.runAnimation = true;
            }, 500);
        }])
;


var galleryServices = angular.module('myApp.galleryServices', ['ngResource']);
galleryServices
    .factory('GalleryResource', ['$resource',
        function ($resource) {
            return $resource('http://www.rest.ericavhay.com/portfolio/gallery/json/:id', {id: '@id'}, {
                update: {
                    method: 'PUT'
                }
            });
        }])
    .factory('GalleryCollection', ['GalleryResource', 'Work',
        'Gallery',
        function (GalleryResource, Work, Gallery) {

            var collection = {};
            collection.galleries = [];

            collection.initialize = function () {

                /* query for all the galleries */
                GalleryResource.query(function (data) {
                    // randomize the order.
                    shuffle(data);
                    for (var i = 0; i < data.length; i++) {
                        var gallery = new Gallery();
                        gallery.initialize(data[i]);
                        collection.galleries.push(gallery);
                    }
                });

            }

            collection.find = function( id )
            {
                var result = null;
                var index = _.findIndex( collection.galleries, function (gallery) {
                    return gallery.id === id;
                })
                if (index > -1)
                {
                    result = collection.galleries[index];
                }
                return result;
            }

            /* for shuffling the order of the galleries */
            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            };

            collection.initialize();

            return collection;
        }
    ])

galleryServices.factory('Gallery', ['GalleryResource', 'WorkResource', '$cacheFactory',

    function (GalleryResource, WorkResource, $cacheFactory) {

        function Gallery(id) {

            var self = this;

            this.save = function () {

                self.saving = true;
                console.log('saving');
                if (self.id) {
                    // update existing.
                    GalleryResource.update({id: self.id}, self, function (work) {
                        if (typeof work.name !== 'undefined') {
                            self.changed = false;
                        }
                    });
                } else {
                    // create new
                    /*
                     todo: this does not work super nice since I am creating a new
                     work resource based on this object, it saves it correctly,
                     but does not change 'self'.  So, I have to re-initialize
                     self based on the response.  not terrible, but not pretty.

                     */
                    var resource = new GalleryResource(self);
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
            };

            this.initialize = function (data) {
                self.id = null;
                self.updated = false;
                angular.extend(self, data);
                if (!angular.isUndefined(self.id))
                {
                    Gallery.cache.put(self.id, self);
                }

            }


            if (typeof id !== 'undefined') {
                this.id = id;
                console.log('requesting id ' + this.id);

                GalleryResource.get({id: this.id}, self, function (data) {
                    //console.log('retrieved work ');
                    console.log(data);
                    self.initialize(data);
                });
            }
            else {
                var data = {};
                self.initialize(data);
            }
        }

        Gallery.cache = new $cacheFactory('Gallery');
        Gallery.instance = function( id )
        {
            var result = Gallery.cache.get( id );
            if (angular.isUndefined(result))
            {
                result = new Gallery( id );
            }
            return result;
        }

        return Gallery;
    }
]);
