describe('Displaying Data Tests', function () {

  var _title = "Tour of Heroes";
  var _defaultHero = 'Windstorm'

  beforeAll(function () {
    browser.get('');
  });

  it('should display correct title: ' + _title, function () {
    expect(element(by.css('h1')).getText()).toEqual(_title);
  });

  it('should have correct default hero:  ' + _defaultHero, function () {
    expect(element(by.css('h2')).getText()).toContain(_defaultHero);
  });

  it('should have many heroes', function () {
    expect(element(by.css('ul ~ p')).getText()).toContain('There are many heroes!');
  });
});
