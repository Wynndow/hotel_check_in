'use strict';

angular.module('hotelligence.globalLogout', ['firebase', 'firebase.utils', 'firebase.auth', 'ngRoute'])
  .factory('LogOutFactory', ['$firebaseObject', 'fbutil', '$rootScope', 'Auth', '$location', function($firebaseObject, fbutil, $rootScope, Auth, $location) {
    return {
      logout: function() {
        // console.log("hello");
        var db = new Firebase('https://hotel-check-in.firebaseio.com/');
        var uid = db.getAuth().uid;
        var unbind;
        var profile = $firebaseObject(fbutil.ref('users', uid));
        profile.$bindTo($rootScope, 'profile').then(function(ub) {
          unbind = ub;
        });

        if (unbind) {
          unbind();
        }

        profile.$destroy();
        Auth.$unauth();
        $rootScope.loggedIn = false;
        $location.path('/login');
      }
    };

}]);
