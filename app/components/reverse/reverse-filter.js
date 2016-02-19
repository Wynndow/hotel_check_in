'use strict';

angular.module('hotelligence')
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  });
