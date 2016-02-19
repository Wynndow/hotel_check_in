'use strict';

angular.module('hotelligence.pictureStore', ['firebase', 'firebase.utils', 'firebase.auth'])
  .factory('Store', function() {
    return {
      saveInDb: function() {
        Webcam.snap(function(data) {
          var db = new Firebase('https://hotel-check-in.firebaseio.com/');
          var uid = db.getAuth().uid;
          var ref = new Firebase('https://hotel-check-in.firebaseio.com/users/' + uid);
          ref.update({
            image: data
          });
        });
      },

    };
  });
