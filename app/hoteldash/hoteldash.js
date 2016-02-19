(function(angular) {
  "use strict";

  var app = angular.module('hotelligence.hoteldash', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute']);

  app.controller('hoteldashController', ['$scope', 'fbutil', 'user', '$firebaseObject', 'FBURL', function($scope, fbutil, user, $firebaseObject, FBURL) {
    $scope.syncedValue = $firebaseObject(fbutil.ref('syncedValue'));
    $scope.user = user;
    $scope.FBURL = FBURL;
    $scope.showModal = false;

    $scope.toggleModal = function() {
      $scope.showModal = !$scope.showModal;
      console.log("modal toggle");
    };

  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/hotelDash', {
      templateUrl: 'hoteldash/hoteldash.html',
      controller: 'hoteldashController',
      resolve: {
        user: ['Auth', function(Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });
  }]);


})(angular);
