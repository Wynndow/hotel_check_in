describe('Hotelligence', function() {

  it('Should display the correct title', function() {
    browser.get('http://localhost:8080/app/');
    expect(browser.getTitle()).toEqual('Hotelligence');
  });

  browser.get('/app/');

 it('should automatically redirect to /home when location hash/fragment is empty', function() {
   expect(browser.getLocationAbsUrl()).toMatch("/home");
 });

});
