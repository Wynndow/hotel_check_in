(function (angular) {
  "use strict";

  var securedRoutes = [];

  angular.module('myApp.security', ['ngRoute', 'firebase.auth', 'myApp.config'])

    .config(['$routeProvider', function ($routeProvider) {
    }])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.whenAuthenticated = function (path, route) {
        securedRoutes.push(path);

        route.resolve = route.resolve || {};
        route.resolve.user = ['Auth', function (Auth) {
          return Auth.$requireAuth();
        }];
        $routeProvider.when(path, route);
        return this;
      };
    }])

    .run(['$rootScope', '$location', 'Auth', 'loginRedirectPath',
      function ($rootScope, $location, Auth, loginRedirectPath) {
        Auth.$onAuth(check);

        $rootScope.$on("$routeChangeError", function (e, next, prev, err) {
          if (err === "AUTH_REQUIRED") {
            $location.path(loginRedirectPath);
          }
        });

        function check(user) {
          if (!user && authRequired($location.path())) {
            console.log('check failed', user, $location.path()); //debug
            $location.path(loginRedirectPath);
          }
        }

        function authRequired(path) {
          console.log('authRequired?', path, securedRoutes.indexOf(path)); //debug
          return securedRoutes.indexOf(path) !== -1;
        }
      }
    ]);

})(angular);
