'use-strict';

describe('hotelligence.account', function() {
  beforeEach(function() {
    module('hotelligence');
    module('hotelligence.account');
  });

  describe('AccountCtrl', function() {
    var accountCtrl, $scope;
    beforeEach(function() {
      module(function($provide) {
        $provide.value('user', {uid: 'test123'});
      });

      inject(function($controller) {
        $scope = {};
        accountCtrl = $controller('AccountCtrl', {$scope: $scope});
      });
    });

    it('should define logout method', function() {
      expect(typeof $scope.logout).toBe('function');
    });

    it('should define changePassword method', function() {
      expect(typeof $scope.changePassword).toBe('function');
    });

    it('should define changeEmail method', function() {
      expect(typeof $scope.changeEmail).toBe('function');
    });

    it('should define clear method', function() {
      expect(typeof $scope.clear).toBe('function');
    });
  });
});
