describe('factory: Store', function() {

  var store;

  beforeEach(module('hotelligence'));

  beforeEach(inject(function(Store) {
    store = Store;
  }));

  it('responds to saveInDb', function() {
    expect(store.saveInDb).toBeDefined();
  });

  it('should tell the Webcam to take a snap', function() {
    spyOn(Webcam, 'snap');
    store.saveInDb();
    expect(Webcam.snap).toHaveBeenCalled();
  });
});
