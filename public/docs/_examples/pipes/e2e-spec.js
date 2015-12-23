// Not yet complete
describe('Pipes', function () {

  beforeAll(function () {
    browser.get('');
  });

  it('should open correctly', function () {
    expect(element.all(by.css('h4')).get(0).getText()).toEqual('Hero Birthday v.1');
    expect(element(by.css('body > hero-birthday p')).getText()).toEqual("The hero's birthday is Apr 15, 1988");
  });

  it('should show delayed message', function () {
    expect(element.all(by.css('hero-message')).get(0).getText()).toEqual('Message: You are my Hero!');
  });

  it('should show 4 heroes', function () {
    expect(element.all(by.css('hero-list div')).count()).toEqual(4);
  });

  it('should show 4 heroes in json', function () {
    expect(element(by.cssContainingText('hero-list p', 'Heroes as JSON')).getText()).toContain('Bombasto');
  });

  it('should show alternate birthday formats', function () {
    expect(element(by.cssContainingText('my-app > p', "The hero's birthday is Apr 15, 1988")).isDisplayed()).toBe(true);
    expect(element(by.cssContainingText('my-app > p', "The hero's birthday is 04/15/88")).isDisplayed()).toBe(true);
  });

  it('should be able to toggle birthday formats', function () {
    var birthDayEle = element(by.css('my-app > hero-birthday > p'));
    expect(birthDayEle.getText()).toEqual("The hero's birthday is 4/15/1988");
    var buttonEle = element(by.cssContainingText('my-app > hero-birthday > button', "Toggle Format"));
    expect(buttonEle.isDisplayed()).toBe(true);
    buttonEle.click().then(function() {
      expect(birthDayEle.getText()).toEqual("The hero's birthday is Friday, April 15, 1988");
    });
  });

});
