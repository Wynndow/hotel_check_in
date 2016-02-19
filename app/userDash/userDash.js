(function(angular) {
  "use strict";

  var app = angular.module('hotelligence.userDash', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute', 'hotelligence.databaseFactory']);

  app.controller('userDashController', ['$scope', 'fbutil', 'user', '$firebaseObject', 'FBURL', 'DatabaseFactory', 'Auth', function($scope, fbutil, user, $firebaseObject, FBURL, DatabaseFactory, Auth) {
    $scope.syncedValue = $firebaseObject(fbutil.ref('syncedValue'));
    $scope.user = user;
    $scope.FBURL = FBURL;
    $scope.showModal = false;
    $scope.showModal2 = false;
    $scope.pic = null;
    var db = new Firebase('https://hotel-check-in.firebaseio.com/');
    $scope.uid = db.getAuth().uid;
    $scope.docSubmit = false;

    $scope.toggleModal = function() {
      $scope.showModal = !$scope.showModal;
    };
    $scope.toggleModal2 = function() {
      $scope.showModal2 = !$scope.showModal2;
    };
    $scope.getImageAvatar = function() {
      var photoAnswer = DatabaseFactory.getUserImage($scope.uid);
      photoAnswer.then(function(answerFinal) {
        $scope.images = answerFinal;
        if($scope.images !== null){
         $scope.docSubmit = true;
         return $scope.docSubmit;
       }
      });
    };
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/userDash', {
      templateUrl: 'userDash/userDash.html',
      controller: 'userDashController',
      resolve: {
        user: ['Auth', function(Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });
  }]);

  app.directive('modal', function() {
    return {
      template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">{{ title }}</h4>' +
        '</div>' +
        '<div class="modal-body" ng-transclude></div>' +
        '</div>' +
        '</div>' +
        '</div>',
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value) {
          if (value === true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function() {
          scope.$apply(function() {
            scope.$parent[attrs.visible] = true;
          });
        });
        $(element).on('hidden.bs.modal', function() {
          scope.$apply(function() {
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
})(angular);
