
describe('Homepage Todo', function () {

  beforeAll(function () {
    browser.get('');
  });

  // Does it even launch?
  var expectedAppTitle = 'Todo';
  it('should display app title: ' + expectedAppTitle, function () {
    expect(element(by.css('h2')).getText()).toEqual(expectedAppTitle);
  });

});
