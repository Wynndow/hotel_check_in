describe('loginController',function() {

 beforeEach(module('checkIn'));

 var loginCtrl;

 beforeEach(inject(function($controller){
    loginCtrl = $controller('loginController');
 }));

  it('intitialises with an empty name and email field',function(){
     expect(loginCtrl.user).toBeUndefined();
     expect(loginCtrl.userEmail).toBeUndefined();
  });

});
