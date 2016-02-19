
describe('hotelligence.home', function() {
  beforeEach(function() {
    module('hotelligence');
    module('hotelligence.home');
  });

  describe('Home Ctrl', function() {
    var homeCtrl, $scope;
    beforeEach(function() {
      module(function($provide) {
        $provide.value('user', {uid: 'test123'});
      });
      inject(function($controller) {
        $scope = {};
        homeCtrl = $controller('HomeCtrl', {$scope: $scope});
      });
    });

    it('assigns user in scope', function() {
      expect(typeof $scope.user).toBe('object');
      expect($scope.user.uid).toBe('test123');
    });
  });
});
