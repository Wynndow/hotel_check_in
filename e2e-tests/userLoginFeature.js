describe('User Login', function() {
   beforeEach(function() {
      browser.get('index.html#/login');
   });

   it('should render user login when user navigates to /login', function() {
      expect(element.all(by.css('[ng-view] h2')).first().getText()).toMatch(/Guest Login/);
   });
});
