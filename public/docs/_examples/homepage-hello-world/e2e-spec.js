
describe('Homepage Hello World', function () {

  beforeAll(function () {
    browser.get('');
  });

  // Does it even launch?
  var expectedLabel = 'Name:';
  it('should display the label: ' + expectedLabel, function () {
    expect(element(by.css('label')).getText()).toEqual(expectedLabel);
  });
  
  it('should display entered name', function () {
    var testName = 'Bobby Joe';
    var newValue;
    var nameEle = element.all(by.css('input')).get(0);
    nameEle.getAttribute('value').then(function(value) {
      // nameEle.sendKeys(testName); // should work but doesn't
      sendKeys(nameEle, testName); // utility that does work
      newValue = value + testName; // old input box value + new name
      expect(nameEle.getAttribute('value')).toEqual(newValue);
    }).then(function() {
      // Check the interpolated message built from name
      var helloEle = element.all(by.css('h1')).get(0);
      expect(helloEle.getText()).toEqual('Hello ' + testName + '!');
    });
  });
});
