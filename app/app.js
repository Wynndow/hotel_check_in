'use strict';

angular.module('hotelligence', [
  'hotelligence.config',
  'hotelligence.security',
  'hotelligence.home',
  'hotelligence.account',
  'hotelligence.login',
  'hotelligence.hotel_login',
  'hotelligence.dataTable',
  'hotelligence.hoteldash',
  'hotelligence.userDash',
  'hotelligence.photo',
  'hotelligence.globalLogout',
  'datatables',
  'xeditable'

])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/home'
  });
}])

.controller('logOutController', ['LogOutFactory', function(LogOutFactory) {
  var self = this;

  self.doLogOut = function () {
    LogOutFactory.logout();
  };

}])

.run(['editableOptions','$rootScope', '$location', 'Auth', 'fbutil', '$firebaseObject', 'LogOutFactory','DatabaseFactory' ,function(editableOptions,$rootScope, $location, Auth, fbutil, $firebaseObject, LogOutFactory, DatabaseFactory) {
  // LogOutFactory.logout();
  editableOptions.theme = 'bs3';
  var thisUserType;
  var uid;
  var thisUserEmail;
  Auth.$onAuth(function(user) {
    // var navProfile = $firebaseObject(fbutil.ref);
    // console.log(navProfile.email)
    $firebaseObject(fbutil.ref('users', user.uid).child('email')).$loaded().then(function(email) {
      $rootScope.thisUserEmail = email.$value;
      // console.log($rootScope.thisUserEmail)
      thisUserEmail = email.$value;
      //  console.log('email:'+thisUserEmail);
     });

    
    $rootScope.loggedIn = !!user;
    // console.log(user.auth.uid);
    uid = user.auth.uid;
    var ref = new Firebase('https://hotel-check-in.firebaseio.com/');
    // console.log(uid);
    $firebaseObject(ref.child('users').child(uid).child('userType')).$loaded().then(function(userType) {
      var thisUserType = userType.$value;
      // console.log(thisUserType);
      $rootScope.userType = thisUserType;
    });

  });
}]);
