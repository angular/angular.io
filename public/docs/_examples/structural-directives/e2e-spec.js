// Not yet complete
describe('Structural Directives', function () {

  beforeAll(function () {
    browser.get('');
  });

  it('should display the heroes correctly', function () {
    var allDivEles = element.all(by.css('structural-directives > div'));
    expect(allDivEles.get(0).getText()).toEqual('Mr. Nice');
    expect(allDivEles.get(1).getText()).toEqual('Mr. Nice');
    expect(allDivEles.get(4).getText()).toEqual('Ready');
  });

  it('should be able to toggle ngIf with a button', function () {
    var buttonEle = element.all(by.css('button')).get(0);
    var conditionTrueEles = element.all(by.cssContainingText('p', 'condition is true'));
    var conditionFalseEles = element.all(by.cssContainingText('p', 'condition is false'));
    expect(conditionTrueEles.count()).toBe(2, 'should be two condition true elements');
    expect(conditionFalseEles.count()).toBe(0, 'should be no condition false elements');
    buttonEle.click().then(function() {
      expect(conditionTrueEles.count()).toBe(0, 'should be no condition true elements');
      expect(conditionFalseEles.count()).toBe(2, 'should be two condition false elements');
    });

  });
});
