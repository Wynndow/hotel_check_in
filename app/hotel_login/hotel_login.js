"use strict";
angular.module('myApp.hotel_login', ['firebase.utils', 'firebase.auth', 'ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/hotelLogin', {
      controller: 'HotelLoginCtrl',
      templateUrl: 'hotel_login/hotel_login.html'
    });
  }])

  .controller('HotelLoginCtrl', ['$scope', 'Auth', '$location', 'fbutil', function($scope, Auth, $location, fbutil) {
    $scope.email = null;
    $scope.pass = null;
    $scope.confirm = null;
    $scope.createMode = false;

    $scope.login = function(email, pass) {
      $scope.err = null;
      Auth.$authWithPassword({ email: email, password: pass }, {rememberMe: true})
        .then(function(/* user */) {
          $location.path('/hotelDash');
        }, function(err) {
          $scope.err = errMessage(err);
        });
    };

    $scope.createAccount = function() {
      $scope.err = null;
      if( assertValidAccountProps() ) {
        var email = $scope.email;
        var pass = $scope.pass;

        Auth.$createUser({email: email, password: pass})
          .then(function() {
            return Auth.$authWithPassword({ email: email, password: pass });
          })
          .then(function(user) {
            var ref = fbutil.ref('hotels', user.uid);
            return fbutil.handler(function(cb) {
              ref.set({email: email, name: name||firstPartOfEmail(email)}, cb);
            });
          })
          .then(function() {
            $location.path('/hotelDash');
          }, function(err) {
            $scope.err = errMessage(err);
          });
      }
    };

    function assertValidAccountProps() {
      if( !$scope.email ) {
        $scope.err = 'Please enter an email address';
      }
      else if( !$scope.pass || !$scope.confirm ) {
        $scope.err = 'Please enter a password';
      }
      else if( $scope.createMode && $scope.pass !== $scope.confirm ) {
        $scope.err = 'Passwords do not match';
      }
      return !$scope.err;
    }

    function errMessage(err) {
      return angular.isObject(err) && err.code? err.code : err + '';
    }

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@'))||'');
    }

    function ucfirst (str) {
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }
  }]);
