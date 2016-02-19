describe('Hotel Login', function() {
   beforeEach(function() {
      browser.get('index.html#/hotelLogin');
   });

   it('should render hotel login when user navigates to /hotelLogin', function() {
      expect(element.all(by.css('[ng-view] h2')).first().getText()).toMatch(/Hotel Login/);
   });
});
