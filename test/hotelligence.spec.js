describe('hotelligenceController', function() {
 beforeEach(module('hotelligence'));

 var ctrl;

 beforeEach(inject(function($controller) {
   ctrl = $controller('hotelligenceController');
 }));

  it('initialises with an empty search result and term', function() {
    expect(ctrl.hello).toEqual('hello world');
  });



});
