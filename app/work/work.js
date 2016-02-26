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
    .controller('WorkCtrl', ['$scope', '$timeout', '$routeParams', 'Work',
        'Style', 'Gallery', '$filter', '$http', 'SelectedWork', '$location', 'Printing',
        function ($scope, $timeout, $routeParams, Work, Style,
                  Gallery, $filter, $http, SelectedWork, $location, Printing) {
            /* for single work pages. */
            $scope.work = new Work;
            var d = new Date();
            var year=d.getFullYear();
            var month=d.getMonth()+1;
            if (month<10){
                month="0" + month;
            };
            var day=d.getDate();
            $scope.date = year + "-" + month + "-" + day;
            $scope.work.date = $scope.date;
            $scope.gallery = {};
            $scope.selected = SelectedWork.selectedWorks();

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

            $scope.includeArchive = false;
            $scope.includeSold = false;

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

                    work.selected = false;
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
                console.log('work.get workid = ' + $routeParams.workId);
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
                var MIN_PRICE = 55.0;
                var EXPONENT_FACTOR = 1.35;
                var LINEAR_FACTOR = 18;

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
                $scope.$apply(function () {
                    $scope.changed = true;
                });
                $scope.imageFile = document.getElementById('file').files[0];
            };

            $scope.setImage = function () {

                var saving = false;
                if ($scope.imageFile) {
                    $scope.saving = true;
                    saving = true;

                    console.log('image file set ');
                    var fd = new FormData();

                    fd.append("file", $scope.imageFile);
                    var uploadUrl = 'https://www.rest.ericavhay.com/portfolio/work/setImageJson/id/' +
                        $scope.work.id;

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
                                $scope.work = response.data;
                                $scope.updated = true;
                                $scope.saving = false;
                            }
                            ,
                            function () {
                                $scope.saving = false;
                                alert('set image failed.')
                            }
                        );
                } else {
                    console.log('image file not set');
                }

                return saving;

            };

            $scope.save = function (work) {
                $scope.saving = true;
                if ($scope.work.id) {
                    // update existing.
                    Work.update({id: $scope.work.id}, $scope.work, function (work) {
                        if (typeof work.name !== 'undefined') {
                            $scope.changed = false;
                        }
                        $scope.saving = $scope.setImage();
                        /* check for new image */

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
            }


            $scope.delete = function (work) {
                if (confirm('are you sure you want to delete ' + work.name)) {
                    Work.delete(work)
                    _.remove($scope.works, work)
                }
            }

            $scope.change = function () {

                $scope.changed = true;
                $scope.updateAuto();
                console.log('changed = true');

            }


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
                SelectedWork.saveSelectedWorks(selected);
                Printing.print();
                $location.path('/work/printLabels');
            }

            $scope.doneLabels = function () {
                Printing.cancelPrint();
                $location.path('/work/admin');
            };

        }]);


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

