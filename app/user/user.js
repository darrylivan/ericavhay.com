/**
 * Created by admin on 2/8/16.
 */



angular.module('myApp.user', ['ngRoute', 'ngAnimate'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'user/login.html',
      controller: 'UserCtrl'
    })
    ;

  }])
  .controller('UserCtrl', function ($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {
    $scope.credentials = {
      username: '',
      password: ''
    };
    $scope.login = function (credentials) {
      console.log('trying login with creds ');
      console.log(credentials);
      AuthService.login(credentials).then(function (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);
        // direct to the admin page for works
        // not going to #login, we should redirect now
        $location.path( "/work/admin" );
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
  })


var authServices = angular.module('myApp.authServices', ['ngResource']);
authServices
  .factory('AuthService', function ($http, Session) {
    var authService = {};

    authService.login = function (credentials) {

      /* we will want to change this to a post instead of a get, but for now
       we can just use a get.  problems with CORS until server/client are
       co-located.
       */
      return $http
      (
        {
          url: 'https://www.rest.ericavhay.com/site/jsonLogin',
          params: credentials,
          method: 'GET'
        })
        .then(function (res) {
          console.log(' login response > ');
          console.log(res);
          var result = res.data;
          if (typeof result.error !== 'undefined') {
            // then we have an error
            console.log('login error: ' + result.error);
          }
          else {
            // user is logged in...
            Session.create(result.id, result.user.id,
              result.user.role);
            return result.user;
          }
        });
    };

    authService.isAuthenticated = function () {
      return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;
  })
  .service('Session', function () {
    this.create = function (sessionId, userId, userRole) {
      this.id = sessionId;
      this.userId = userId;
      this.userRole = userRole;
    };
    this.destroy = function () {
      this.id = null;
      this.userId = null;
      this.userRole = null;
    };
  })
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    guest: 'guest'
  })