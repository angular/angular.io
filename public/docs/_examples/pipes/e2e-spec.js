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

  it('should be able to chain and compose pipes', function () {
    var chainedPipeEles = element.all(by.cssContainingText('my-app p', "The chained hero's"));
    expect(chainedPipeEles.count()).toBe(3, "should have 3 chained pipe examples");
    expect(chainedPipeEles.get(0).getText()).toContain('APR 15, 1988');
    expect(chainedPipeEles.get(1).getText()).toContain('FRIDAY, APRIL 15, 1988');
    expect(chainedPipeEles.get(2).getText()).toContain('FRIDAY, APRIL 15, 1988');
  });

  it('should be able to use ExponentialStrengthPipe pipe', function () {
    var ele = element(by.css('power-booster p'));
    expect(ele.getText()).toContain('Super power boost: 1024');
  });

  it('should be able to use the exponential calculator', function () {
    var eles = element.all(by.css('power-boost-calculator input'));
    var baseInputEle = eles.get(0);
    var factorInputEle = eles.get(1);
    var outputEle = element(by.css('power-boost-calculator p'));
    baseInputEle.clear().then(function() {
      return sendKeys(baseInputEle, "7");
    }).then(function() {
      return factorInputEle.clear();
    }).then(function() {
      return sendKeys(factorInputEle, "3");
    }).then(function() {
      expect(outputEle.getText()).toContain("343");
    });
  });



});
