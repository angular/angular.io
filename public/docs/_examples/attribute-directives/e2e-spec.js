
describe('Attribute directives', function () {

  var _title = "My First Attribute Directive";

  beforeEach(function () {
    browser.get('');
  });

  it('should display correct title: ' + _title, function () {
    expect(element(by.css('h1')).getText()).toEqual(_title);
  });


});
