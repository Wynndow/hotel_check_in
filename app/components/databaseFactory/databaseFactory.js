'use strict';

angular.module('hotelligence.databaseFactory', ['firebase', 'firebase.utils', 'firebase.auth'])

.factory('DatabaseFactory', function($firebaseObject) {
  var self = this;
  var db = new Firebase('https://hotel-check-in.firebaseio.com/');
  // console.log('database factory called');
  return {

    createBookingInDb: function(guestUid, bookingRef, checkedIn, guest_Uid,
      guestName, paymentStatus, picture, roomNumber, roomReady,
      scheduledCheckIn, stayDuration) {

      var ref = new Firebase('https://hotel-check-in.firebaseio.com/users/' + uid + '/bookings');
      ref.push({
        booking_reference: bookingRef,
        checked_in: checkedIn,
        guestUid: guest_Uid,
        name: guestName,
        payment_status: paymentStatus,
        photos: picture,
        room_number: roomNumber,
        room_ready: roomReady,
        scheduled_check_in_time: scheduledCheckIn,
        stay_duration: stayDuration
      });
    },

    retrieveBookingInDb: function(uid) {

    },

    updateBookingInDb: function(uid) {

    },

    saveUserImage: function(uid) {

    },

    getUserImage: function(uid) {
      return $firebaseObject(db.child('users').child(uid).child('image')).$loaded().then(function(image) {
        return image.$value;
      });
    },
    
    getCheckedInStatus: function(uid) {
      return $firebaseObject(db.child('users').child(uid).child('onSite')).$loaded().then(function(checkInStatus) {
        console.log("infactory");
        console.log(checkInStatus);
        var result = checkInStatus.$value;
        console.log(result);
        return result;
      });
    }

  };
});
