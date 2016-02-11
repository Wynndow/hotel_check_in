'use-strict';

describe('my app', function() {

  it('should automatically redirect to /home when location hash/fragment is empty', function() {
    browser.get('index.html');

    expect(browser.getLocationAbsUrl()).toMatch("/home");
  });

  describe('home', function() {

    beforeEach(function() {
      browser.get('index.html#/home');
    });

    it('should render home when user navigates to /home', function() {
      expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Home/);
    });

  });

   describe('account', function() {
      it('should redirect to /login if not logged in', function() {
         browser.get('index.html#/account');
         expect(browser.getLocationAbsUrl()).toMatch('/login');
      });

   });

   describe('login', function() {
      beforeEach(function() {
         browser.get('index.html#/login');
      });

      it('should render login when user navigates to /login', function() {
         expect(element.all(by.css('[ng-view] h2')).first().getText()).toMatch(/Login Page/);
      });

   });
});
