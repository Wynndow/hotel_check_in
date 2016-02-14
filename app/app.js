'use strict';

angular.module('myApp', [
  'myApp.config',
  'myApp.security',
  'myApp.home',
  'myApp.account',
  'myApp.login',
  'myApp.hotel_login',
  'myApp.hoteldash',
  'myApp.userDash',
  'myApp.photo'


])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/home'
  });
}])

.run(['$rootScope', '$location', 'Auth', '$firebaseObject', function($rootScope, $location, Auth, $firebaseObject) {

  var thisUserType;
  var uid;
  Auth.$onAuth(function(user) {

    $rootScope.loggedIn = !!user;
    console.log(user.auth.uid);
    uid = user.auth.uid;
    var ref = new Firebase('https://hotel-check-in.firebaseio.com/');
    console.log(uid);
    $firebaseObject(ref.child('users').child(uid).child('userType')).$loaded().then(function(userType) {
      var thisUserType = userType.$value;
      console.log(thisUserType);
      $rootScope.userType = thisUserType;
    });

  });
}]);
