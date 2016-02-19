
describe('hotelligence.hotel_login', function() {
  beforeEach(function() {
    module('hotelligence');
    module('hotelligence.hotel_login');
  });

  describe('Hotel Login Ctrl', function() {
    var hotelLoginCtrl, $scope;
    beforeEach(function() {
      inject(function($controller) {
        $scope = {};
        loginCtrl = $controller('HotelLoginCtrl', {$scope: $scope});
      });
    });

    it('should define login function', function() {
      expect(typeof $scope.login).toBe('function');
    });

    it('should define createAccount function', function() {
      expect(typeof $scope.createAccount).toBe('function');
    });
  });
});
