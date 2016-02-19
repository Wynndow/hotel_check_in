'use strict';

angular.module('hotelligence.config', [])

  .constant('version', '0.1.0')

  .constant('loginRedirectPath', '/login')

  .constant('FBURL', 'https://hotel-check-in.firebaseio.com')

  .run(['FBURL', '$timeout', function(FBURL, $timeout) {
    if( FBURL.match('//INSTANCE.firebaseio.com') ) {
      angular.element(document.body).html('<h1>Please configure app/config.js before running!</h1>');
      $timeout(function() {
        angular.element(document.body).removeClass('hide');
      }, 250);
    }
  }]);
