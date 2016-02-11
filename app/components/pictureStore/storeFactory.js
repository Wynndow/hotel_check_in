'use strict';

angular.module('myApp.pictureStore', ['firebase', 'firebase.utils', 'firebase.auth'])
  .factory('Store', function() {
    return {
      saveInDb: function() {
        Webcam.snap(function(data) {
          var uid = ref.getAuth().uid;
          var ref = new Firebase('https://hotel-check-in.firebaseio.com/users/' + uid);
          ref.update({
            image: data
          });
        });
      }
    };
  });
