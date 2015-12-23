describe('Attribute directives', function () {

  var _title = "My First Attribute Directive";

  beforeAll(function () {
    browser.get('');
  });

  it('should display correct title: ' + _title, function () {
    expect(element(by.css('h1')).getText()).toEqual(_title);
  });

  it('should be able to select green highlight', function () {
    var highlightedEle = element(by.cssContainingText('p', 'Highlight me'));
    var lightGreen = "rgba(144, 238, 144, 1)";

    expect(highlightedEle.getCssValue('background-color')).not.toEqual(lightGreen);
    // var greenRb = element(by.cssContainingText('input', 'Green'));
    var greenRb = element.all(by.css('input')).get(0);
    greenRb.click().then(function() {
      browser.actions().mouseMove(highlightedEle).perform();
      expect(highlightedEle.getCssValue('background-color')).toEqual(lightGreen);
    });

  });
});
