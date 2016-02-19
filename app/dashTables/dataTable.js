(function(angular) {
  'use strict';

  var app = angular.module('hotelligence.dataTable', ['firebase',
    'firebase.utils', 'firebase.auth', 'ngRoute', 'datatables',
    'hotelligence.pictureStore', 'hotelligence.databaseFactory'
  ]);

  app.controller('DataTableCtrl', ['$scope', '$firebaseArray',
    '$firebaseObject', 'DatabaseFactory', 'fbutil', '$location',
    function DataTableCtrl($scope, $firebaseArray, $firebaseObject,
      DatabaseFactory, fbutil, $location) {

      var self = this;
      var db = new Firebase('https://hotel-check-in.firebaseio.com/');
      var uid = db.getAuth().uid;
      self.bookingsIdArray = [];
      self.bookingsDocImageArray = [];
      self.bookings = $firebaseObject(db.child('users').child(uid).child('bookings'));

      self.bookings.$bindTo($scope, 'booking')
        .then(function() {
          console.log("bound");
        });


      $firebaseArray(db.child('users').child(uid).child('bookings')).$loaded().then(function(bookingsArray) {
        console.log(bookingsArray);
        self.bookingsArray = bookingsArray;
        console.log(self.bookingsArray);

        angular.forEach(self.bookingsArray, function(booking) {
          console.log('booking fore each:!!!!!: ' + booking);
          self.bookingsIdArray.push(booking.guestUid);
        });
        console.log(self.bookingsIdArray);

        var imageIndex = 0;
        angular.forEach(self.bookingsIdArray, function(bookingUserID, imageIndex) {
          console.log('bookingID fore each:!: ' + bookingUserID);
          var userImage = DatabaseFactory.getUserImage(bookingUserID);
          console.log(userImage);
          self.bookingsDocImageArray.push(userImage);
          console.log('INDEX:' + imageIndex);
          console.log(uid);

          console.log(userImage);

          // db.child('users').child(uid).child('bookings').child(imageIndex).update({
          //   // photos: userImage
          //   photos: 'heloo'
          // });
          imageIndex++;
        });
        console.log(self.bookingsDocImageArray);
      });

      self.updateRoomNumber = function(newValue,index) {
        db.child('users').child(uid).child('bookings').child(index).update({
          room_number: newValue
        });
      };


      self.checkIfEnterKeyWasPressed = function($event){
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
          db.child('users').child(uid).child('bookings').child(index).update({
            room_number: newValue
          });
        }

 };

      self.getImageAvatar = function(uid) {
        var photoAnswer = DatabaseFactory.getUserImage(uid);
        photoAnswer.then(function(answerFinal) {
          self.images = answerFinal;
        });
        return self.images;
      };

    }

  ]);
})(angular);
