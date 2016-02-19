
describe('hotelligence.hoteldash', function() {
  beforeEach(function() {
    module('hotelligence');
    module('hotelligence.hoteldash');
  });

  describe('Hotel Dash Ctrl', function() {
    var homeCtrl, $scope;
    beforeEach(function() {
      module(function($provide) {
        $provide.value('user', {uid: 'test123'});
      });
      inject(function($controller) {
        $scope = {};
        ctrl = $controller('hoteldashController', {$scope: $scope});
      });
    });

    it('assigns user in scope', function() {
      expect(typeof $scope.user).toBe('object');
      expect($scope.user.uid).toBe('test123');
    });
  });
});
