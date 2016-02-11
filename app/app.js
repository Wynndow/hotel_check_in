'use strict';

angular.module('myApp', [
    'myApp.config',
    'myApp.security',
    'myApp.home',
    'myApp.account',
    'myApp.login',
    'myApp.photo'
  ])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/home'
    });
  }])

  .run(['$rootScope', 'Auth', function($rootScope, Auth) {
    Auth.$onAuth(function(user) {
      $rootScope.loggedIn = !!user;
    });
  }]);
