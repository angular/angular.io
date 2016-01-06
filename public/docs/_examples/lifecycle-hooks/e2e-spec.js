describe('Lifecycle hooks', function () {

  beforeAll(function () {
    browser.get('');
  });

  it('should open correctly', function () {
    expect(element.all(by.css('h2')).get(0).getText()).toEqual('Peek-A-Boo');
  });

  it('should be able to drive peek-a-boo button', function () {
    var pabComp = element(by.css('peek-a-boo-parent peek-a-boo'));
    expect(pabComp.isPresent()).toBe(false, "should not be able to find the 'peek-a-boo' component");
    var pabButton = element.all(by.css('peek-a-boo-parent button')).get(0);
    var updateHeroButton = element.all(by.css('peek-a-boo-parent button')).get(1);
    expect(pabButton.getText()).toContain('Create Peek');
    pabButton.click().then(function () {
      expect(pabButton.getText()).toContain('Destroy Peek');
      expect(pabComp.isDisplayed()).toBe(true, "should be able to see the 'peek-a-boo' component");
      expect(pabComp.getText()).toContain('Windstorm');
      expect(pabComp.getText()).not.toContain('Windstorm!');
      expect(updateHeroButton.isPresent()).toBe(true, "should be able to see the update hero button");
      return updateHeroButton.click();
    }).then(function () {
      expect(pabComp.getText()).toContain('Windstorm!');
      return pabButton.click();
    }).then(function () {
      expect(pabComp.isPresent()).toBe(false, "should no longer be able to find the 'peek-a-boo' component");
    });
  });

  it('should be able to trigger onChanges', function () {
    var onChangesViewEle = element.all(by.css('on-changes-parent my-hero div')).get(0);
    var inputEles = element.all(by.css('on-changes-parent input'));
    var heroNameInputEle = inputEles.get(0);
    var powerInputEle = inputEles.get(1);
    var titleEle = onChangesViewEle.element(by.css('p'));
    expect(titleEle.getText()).toContain('Windstorm can sing');
    var changeLogEles = onChangesViewEle.all(by.css('div'));
    expect(changeLogEles.count()).toEqual(3, "should start with 3 messages");
    // heroNameInputEle.sendKeys('-foo-').then(function () {
    sendKeys(heroNameInputEle, '-foo-').then(function () {
      expect(titleEle.getText()).toContain('Windstorm-foo- can sing');
      expect(changeLogEles.count()).toEqual(3, "should still have 3 messages");
      // protractor bug with sendKeys means that line below does not work.
      // return powerInputEle.sendKeys('-bar-');
      return sendKeys(powerInputEle, '-bar-');
    }).then(function () {
      expect(titleEle.getText()).toContain('Windstorm-foo- can sing-bar-');
      // 8 == 3 previously + length of '-bar-'
      expect(changeLogEles.count()).toEqual(8, "should have 8 messages now");
    });
  });

  it('should support after-view hooks', function () {
    var inputEle = element(by.css('after-view-parent input'));
    var buttonEle = element(by.css('after-view-parent button'));
    var logEles = element.all(by.css('after-view-parent h4 ~ div'));
    var childViewTextEle = element(by.css('after-view-parent my-child .child'));
    expect(childViewTextEle.getText()).toContain('Magneta is my hero');
    expect(logEles.count()).toBeGreaterThan(2);
    var logCount;
    logEles.count().then(function(count) {
      logCount = count;
      return sendKeys(inputEle, "-test-");
    }).then(function() {
      expect(childViewTextEle.getText()).toContain('-test-');
      return logEles.count();
    }).then(function(count) {
      expect(logCount + 6).toEqual(count, "6 additional log messages should have been added");
      logCount = count;
      return buttonEle.click();
    }).then(function() {
      expect(childViewTextEle.isPresent()).toBe(false,"child view should no longer be part of the DOM");
      sendKeys(inputEle, "-foo-");
      expect(logEles.count()).toEqual(logCount, "no additional log messages should have been added");
    });
  });

  it('should support after-content hooks', function () {
    var inputEle = element(by.css('after-content-parent input'));
    var buttonEle = element(by.css('after-content-parent button'));
    var logEles = element.all(by.css('after-content-parent h4 ~ div'));
    var childViewTextEle = element(by.css('after-content-parent my-child .child'));
    expect(childViewTextEle.getText()).toContain('Magneta is my hero');
    expect(logEles.count()).toBeGreaterThan(2);
    var logCount;
    logEles.count().then(function(count) {
      logCount = count;
      return sendKeys(inputEle, "-test-");
    }).then(function() {
      expect(childViewTextEle.getText()).toContain('-test-');
      return logEles.count();
    }).then(function(count) {
      expect(logCount + 6).toEqual(count, "6 additional log messages should have been added");
      logCount = count;
      return buttonEle.click();
    }).then(function() {
      expect(childViewTextEle.isPresent()).toBe(false,"child view should no longer be part of the DOM");
      sendKeys(inputEle, "-foo-");
      expect(logEles.count()).toEqual(logCount, "no additional log messages should have been added");
    });
  });

  it('should support "spy" hooks', function () {
    var inputEle = element(by.css('spy-parent input'));
    var addHeroButtonEle = element(by.cssContainingText('spy-parent button','Add Hero'));
    var resetHeroesButtonEle = element(by.cssContainingText('spy-parent button','Reset Heroes'));
    var heroEles = element.all(by.css('spy-parent div[my-spy'));
    var logEles = element.all(by.css('spy-parent h4 ~ div'));
    expect(heroEles.count()).toBe(2, 'should have two heroes displayed');
    expect(logEles.count()).toBe(2, 'should have two log entries');
    sendKeys(inputEle, "-test-").then(function() {
      return addHeroButtonEle.click();
    }).then(function() {
      expect(heroEles.count()).toBe(3, 'should have added one hero');
      expect(heroEles.get(2).getText()).toContain('-test-');
      expect(logEles.count()).toBe(3, 'should now have 3 log entries');
      return resetHeroesButtonEle.click();
    }).then(function() {
      expect(heroEles.count()).toBe(0, 'should no longer have any heroes');
      expect(logEles.count()).toBe(7, 'should now have 7 log entries - 3 orig + 1 reset + 3 removeall');
    })
  });

  it('should support "spy counter" hooks', function () {
    var updateCounterButtonEle = element(by.cssContainingText('counter-parent button','Update'));
    var resetCounterButtonEle = element(by.cssContainingText('counter-parent button','Reset'));
    var textEle = element(by.css('counter-parent my-counter > div'));
    var logEles = element.all(by.css('counter-parent h4 ~ div'));
    expect(textEle.getText()).toContain('Counter = 0');
    expect(logEles.count()).toBe(2, 'should start with two log entries');
    updateCounterButtonEle.click().then(function() {
      expect(textEle.getText()).toContain('Counter = 1');
      expect(logEles.count()).toBe(3, 'should now have 3 log entries');
      return resetCounterButtonEle.click();
    }).then(function() {
      expect(textEle.getText()).toContain('Counter = 0');
      expect(logEles.count()).toBe(7, 'should now have 7 log entries - 3 prev + 1 reset + 2 destroy + 1 init');
    })
  });


});
