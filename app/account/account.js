(function(angular) {
  "use strict";

  var app = angular.module('hotelligence.account', ['firebase', 'firebase.utils', 'firebase.auth', 'ngRoute']);

  app.controller('AccountCtrl', ['$rootScope', '$scope', 'Auth', 'fbutil', 'user', '$location', '$firebaseObject',
    function($rootScope, $scope, Auth, fbutil, user, $location, $firebaseObject) {
      var unbind;
      var profile = $firebaseObject(fbutil.ref('users', user.uid));
      profile.$bindTo($scope, 'profile').then(function(ub) {
        unbind = ub;
      });

      // $scope.reloadRoute = function() {
      //   $route.reload();
      // };

      $scope.logout = function() {
        if (unbind) {
          unbind();
        }

        profile.$destroy();
        Auth.$unauth();
        $rootScope.loggedIn = false;
        $location.path('/login');

      };

      $rootScope.logout2 = function() {
        if (unbind) {
          unbind();
        }

        profile.$destroy();
        Auth.$unauth();
        $rootScope.loggedIn = false;
        $location.path('/login');

      };

      $scope.changePassword = function(pass, confirm, newPass) {
        resetMessages();
        if (!pass || !confirm || !newPass) {
          $scope.err = 'Please fill in all password fields';
        } else if (newPass !== confirm) {
          $scope.err = 'New pass and confirm do not match';
        } else {
          Auth.$changePassword({
              email: profile.email,
              oldPassword: pass,
              newPassword: newPass
            })
            .then(function() {
              $scope.msg = 'Password changed';
            }, function(err) {
              $scope.err = err;

            });
        }
      };

      $scope.clear = resetMessages;

      $scope.changeEmail = function(pass, newEmail) {
        resetMessages();
        var oldEmail = profile.email;
        Auth.$changeEmail({
            oldEmail: oldEmail,
            newEmail: newEmail,
            password: pass
          })
          .then(function() {
            return fbutil.handler(function(done) {
              fbutil.ref('users', user.uid, 'email').set(newEmail, done);
            });
          })
          .then(function() {
            $scope.emailmsg = 'Email changed';
          }, function(err) {
            $scope.emailerr = err;
          });
      };

      function resetMessages() {
        $scope.err = null;
        $scope.msg = null;
        $scope.emailerr = null;
        $scope.emailmsg = null;
      }
    }
  ]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.whenAuthenticated('/account', {
      templateUrl: 'account/account.html',
      controller: 'AccountCtrl'
    });
  }]);
})(angular);
