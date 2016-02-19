(function (angular) {
  "use strict";


  var app = angular.module('hotelligence.photo', ['firebase', 'firebase.utils', 'firebase.auth', 'hotelligence.pictureStore', 'ngRoute']);

  app.controller('photoController', ['Store', function(Store){
    var self = this;
    Webcam.attach('#camera_image');

    self.takePhoto = function() {
      Webcam.freeze();
      self.moreButtons = true;
    };

    self.retakePhoto = function() {
      Webcam.unfreeze();
      self.moreButtons = false;
    };

    self.storePhoto = function() {
      Store.saveInDb();
    };
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.whenAuthenticated('/photo', {
      templateUrl: 'photo/photo.html'
    });
  }]);

})(angular);
