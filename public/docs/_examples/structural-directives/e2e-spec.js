describe('Structural Directives', function () {

  // tests interact - so we need beforeEach instead of beforeAll
  beforeEach(function () {
    browser.get('');
  });

  it('should be able to use ngFor, ngIf and ngWhen together', function () {
    var allDivEles = element.all(by.css('structural-directives > div'));
    expect(allDivEles.get(0).getText()).toEqual('Mr. Nice');
    expect(allDivEles.get(1).getText()).toEqual('Mr. Nice');
    expect(allDivEles.get(4).getText()).toEqual('Ready');
  });

  it('should be able to toggle ngIf with a button', function () {
    var setConditionButtonEle = element.all(by.css('button')).get(0);
    var conditionTrueEles = element.all(by.cssContainingText('p', 'condition is true'));
    var conditionFalseEles = element.all(by.cssContainingText('p', 'condition is false'));
    expect(conditionTrueEles.count()).toBe(2, 'should be two condition true elements');
    expect(conditionFalseEles.count()).toBe(0, 'should be no condition false elements');
    setConditionButtonEle.click().then(function() {
      expect(conditionTrueEles.count()).toBe(0, 'should be no condition true elements');
      expect(conditionFalseEles.count()).toBe(2, 'should be two condition false elements');
    });
  });

  it('should be able to compare use of ngIf with changing css visibility', function () {
    var setConditionButtonEle = element.all(by.css('button')).get(0);
    var ngIfButtonEle = element(by.cssContainingText('button', 'if | !if'));
    var ngIfParentEle = ngIfButtonEle.element(by.xpath('..'));
    var ngIfSiblingEle = ngIfParentEle.element(by.css('heavy-loader'));
    var cssButtonEle = element(by.cssContainingText('button', 'show | hide'));
    var cssSiblingEle = cssButtonEle.element(by.xpath('..')).element(by.css('heavy-loader'));
    var setConditionText;
    setConditionButtonEle.getText().then(function(text) {
      setConditionText = text;
      expect(ngIfButtonEle.isPresent()).toBe(true, 'should be able to find ngIfButton');
      expect(cssButtonEle.isPresent()).toBe(true, 'should be able to find cssButton');
      expect(ngIfParentEle.isPresent()).toBe(true, 'should be able to find ngIfButton parent');
      expect(ngIfSiblingEle.isPresent()).toBe(true, 'should be able to find ngIfButton sibling');
      expect(cssSiblingEle.isPresent()).toBe(true, 'should be able to find cssButton sibling');
      return ngIfButtonEle.click();
    }).then(function() {
      expect(ngIfSiblingEle.isPresent()).toBe(false, 'now should NOT be able to find ngIfButton sibling');
      expect(setConditionButtonEle.getText()).not.toEqual(setConditionText);
      return cssButtonEle.click();
    }).then(function() {
      expect(cssSiblingEle.isPresent()).toBe(true, 'now should still be able to find cssButton sibling');
      expect(cssSiblingEle.isDisplayed()).toBe(false, 'now cssButton sibling should NOT be visible');
      return ngIfButtonEle.click();
    }).then(function() {
      expect(setConditionButtonEle.getText()).toEqual(setConditionText);
    });
  });

  it('should be able to use *ngIf ', function () {
    var setConditionButtonEle = element.all(by.css('button')).get(0);
    var displayEles = element.all(by.cssContainingText('p', 'Our heroes are true!'));
    expect(displayEles.count()).toBe(2, "should be displaying two ngIf elements");
    setConditionButtonEle.click().then(function() {
      expect(displayEles.count()).toBe(0, "should nog longer be displaying ngIf elements");
    });
  });
});
