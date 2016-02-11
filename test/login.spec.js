describe('loginController', function(){
  beforeEach(function(){
    module('hotelligence');
  });

  describe('loginController', function(){
    var loginCtrl;



    beforeEach(inject(function($controller) {
      loginCtrl = $controller('loginController');
    }));

    it('initialises with an empty email and password', function(){
      expect(loginCtrl.email).toEqual('');
      expect(loginCtrl.password).toEqual('');
    });
  });
});
