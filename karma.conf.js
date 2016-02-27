module.exports = function (config) {
    config.set({

        basePath: './',

        files: [

            'bower_components/lodash/lodash.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-touch/angular-touch.min.js',
            'bower_components/angular-masonry/angular-masonry.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/angular-animate/angular-animate.js',
            'http://cdnjs.cloudflare.com/ajax/libs/gsap/1.10.3/TweenMax.min.js',
            'app/app.js',
            'app/js/*.js',
            'app/work/*.js',
            'app/menu/*.js',
            'app/user/*.js',
            'app/style/*.js',
            'app/gallery/*.js',
            'app/footer/*.js',

        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
