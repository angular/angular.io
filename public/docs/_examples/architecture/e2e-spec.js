
describe('Attribute directives', function () {

  var _title = "Hero List";

  beforeEach(function () {
    browser.get('');
  });

  it('should display correct title: ' + _title, function () {
    expect(element(by.css('h2')).getText()).toEqual(_title);
  });


});
