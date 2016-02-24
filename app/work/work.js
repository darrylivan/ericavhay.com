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
        }).when('/work/:workId', {
            templateUrl: 'work/work-detail.html',
            controller: 'WorkCtrl'
        }).when('/work/update/:workId', {
            templateUrl: 'work/update.html',
            controller: 'WorkCtrl'
        }).when('/work/inquire/:workId', {
            templateUrl: 'work/work-purchase.html',
            controller: 'WorkCtrl'
        });

    }])
    .controller('WorkCtrl', ['$scope', '$timeout', '$routeParams', 'Work', 'Style', 'Gallery', '$filter',
        function ($scope, $timeout, $routeParams, Work, Style, Gallery, $filter) {
            /* for single work pages. */
            $scope.work = new Work;
            $scope.gallery = {};
            $scope.changed = false;

            $scope.tryAutoPrice = false;
            $scope.supplement = 0;
            $scope.basePrice = 0;
            $scope.autoPrice = 'not set';

            /* for index pages */
            $scope.works = [];
            $scope.filters = {};
            $scope.styles = [];
            $scope.styleNames = [];
            $scope.orderProp = '-date';
            $scope.galleries = [];
            $scope.updated = false;

            $scope.imageFile = false;

            /* to accumulate the total of sold paintings */
            $scope.soldTotal = 0;

            Work.query(function (data) {
                $scope.works = data;
                $scope.runAnimation = false;
                $scope.styleNames = [];
                for (var i = 0; i < data.length; i++) {
                    var work = data[i];
                    if ($scope.styleNames.indexOf(work.style) == -1) {
                        if (( typeof work.style !== 'undefined' ) && ( work.style !== '') &&
                            (work.archive !== true) && (work.featured === true)) {
                            $scope.styleNames.push(work.style);
                        }
                    }

                    if (work.sold) {
                        $scope.soldTotal += parseInt(work.price);
                    }
                }

                $timeout(function () {
                    $scope.runAnimation = true;
                }, 500);
                $scope.setStyles();

                $scope.updated = true;

            });

            $scope.setStyles = function () {
                var tmp = [{name: 'all'}];

                for (var i = 0; i < $scope.styleNames.length; i++) {
                    for (var j = 0; j < $scope.styles.length; j++) {
                        var name = $scope.styleNames[i];
                        var style = $scope.styles[j];
                        if (style.name === name) {
                            tmp.push(style)
                        }
                    }

                }
                if (tmp.length > 1) {
                    $scope.styles = tmp;
                }
            }
            $scope.filterOnStyle = function (style) {
                console.log('filtering on ' + style);
                if (style.name == 'all') {
                    $scope.filters = {};
                }
                else {
                    $scope.filters.style = style.name;
                }
            }

            if ((typeof $routeParams.workId !== 'undefined') && ($routeParams.workId !== 'create')) {
                console.log('workid = ' + $routeParams.workId);
                $scope.work = Work.get({id: $routeParams.workId}, function (work) {

                    // get the gallery
                    $scope.gallery = Gallery.get({id: work.galleryId}, function (gallery) {

                    });

                    /* after getting the work, update auto pricing and
                     notify the controller we are updated */
                    $scope.updateAuto();
                    $scope.updated = true;

                });
            }


            /* when supplement changes, calculate the new autoprice */
            $scope.updateAuto = function () {
                // calculate auto price after work is loaded.
                const MIN_PRICE = 55.0;
                const EXPONENT_FACTOR = 1.35;
                const LINEAR_FACTOR = 18;

                var area = $scope.work.height * $scope.work.width;
                // work on square root of area...
                var sqArea = Math.sqrt(area);

                var psif = LINEAR_FACTOR;
                var price = Math.pow(sqArea, 2) * EXPONENT_FACTOR + psif * sqArea + MIN_PRICE;
                price = Math.floor(price / 10) * 10;
                $scope.basePrice = price;
                $scope.autoPrice = $scope.basePrice + $scope.supplement;
            }

            /* when sold is set to true, need to set the sold date to today if not already set */
            $scope.updateSoldDate = function () {
                if ($scope.work.sold) {
                    // see if we need to set the sold date
                    if (($scope.work.soldDate === '') || ($scope.work.soldDate === '0000-00-00')) {
                        $scope.work.soldDate = $filter('date')(new Date(), "yyyy-MM-dd");
                    }
                }
                $scope.change();
            }

            $scope.styles = Style.query({}, function (styles) {
                // do anything special, or just allow data bindings to do it...
                $scope.setStyles();

            });

            $scope.galleries = Gallery.query({}, function (galleries) {
                // do anything special, or just allow data bindings to do it...

            });

            $scope.selectImage = function () {
                $scope.change();
                $scope.imageFile = document.getElementById('file').files[0];
            }

            $scope.setImage = function () {

                if ($scope.imageFile) {
                    console.log('image file set ');
                    var fd = new FormData();

                    fd.append("file", files[0]);
                    var uploadUrl = 'rest.ericavhay.com/portfolio/work/setImageJson';

                    $http.post(uploadUrl, fd, {
                        withCredentials: true,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(
                        function (data) {
                            $scope.work = data;
                            $scope.updated = true;
                        }
                    ).error(
                        function () {
                            alert('set image failed.')
                        }
                    );


                    /*

                     var r = new FileReader();
                     r.onloadend = function (e) {
                     $scope.rawImage = e.target.result;
                     //send you binary data via $http or $resource or do anything else with it

                     /*
                     $scope.work.setImage( $scope.rawImage, function()
                     {
                     document.getElementById('file').value = null;

                     });
                     }

                     r.readAsBinaryString( $scope.imageFile );
                     }
                     */
                } else {
                    console.log('image file not set');
                }


            }

            $scope.save = function (work) {
                $scope.saving = true;
                if ($scope.work.id) {
                    // update existing.
                    Work.update({id: $scope.work.id}, $scope.work, function (work) {
                        if (typeof work.name !== 'undefined') {
                            $scope.changed = false;
                        }
                        $scope.saving = false;
                    });
                } else {
                    // create new
                    $scope.work.$save().then(function (response) {
                        if (typeof response.name !== 'undefined') {
                            $scope.changed = false;
                        }
                        $scope.saving = false;
                    });
                }

                /* check for new image */
                $scope.setImage();
            }

            $scope.change = function () {
                $scope.$apply(function () {
                    $scope.changed = true;
                    $scope.updateAuto();
                    console.log('changed = true');
                });
            }

        }])
;


/* Work Services */
var workServices = angular.module('myApp.workServices', ['ngResource']);
workServices.factory('Work', ['$resource',
    function ($resource) {
        return $resource('http://www.rest.ericavhay.com/portfolio/work/json/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    }]);

