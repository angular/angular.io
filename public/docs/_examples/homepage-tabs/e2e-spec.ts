
describe('Homepage Tabs', function () {

  beforeAll(function () {
    browser.get('');
  });

  // Does it even launch?
  var expectedAppTitle = 'Tabs Demo';
  it('should display app title: ' + expectedAppTitle, function () {
    expect(element(by.css('h4')).getText()).toEqual(expectedAppTitle);
  });

});
