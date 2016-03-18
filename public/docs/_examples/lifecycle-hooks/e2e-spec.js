describe('Lifecycle hooks', function () {

  beforeAll(function () {
    browser.get('');
  });

  it('should open correctly', function () {
    expect(element.all(by.css('h2')).get(0).getText()).toEqual('Peek-A-Boo');
  });

  it('should support peek-a-boo', function () {
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

  it('should support OnChanges hook', function () {
    var onChangesViewEle = element.all(by.css('on-changes div')).get(0);
    var inputEles = element.all(by.css('on-changes-parent input'));
    var heroNameInputEle = inputEles.get(1);
    var powerInputEle = inputEles.get(0);
    var titleEle = onChangesViewEle.element(by.css('p'));
    var changeLogEles = onChangesViewEle.all(by.css('div'));
    
    expect(titleEle.getText()).toContain('Windstorm can sing');
    expect(changeLogEles.count()).toEqual(2, "should start with 2 messages");
    // heroNameInputEle.sendKeys('-foo-').then(function () {
    sendKeys(heroNameInputEle, '-foo-').then(function () {
      expect(titleEle.getText()).toContain('Windstorm-foo- can sing');
      expect(changeLogEles.count()).toEqual(2, "should still have 2 messages");
      // protractor bug with sendKeys means that line below does not work.
      // return powerInputEle.sendKeys('-bar-');
      return sendKeys(powerInputEle, '-bar-');
    }).then(function () {
      expect(titleEle.getText()).toContain('Windstorm-foo- can sing-bar-');
      // 7 == 2 previously + length of '-bar-'
      expect(changeLogEles.count()).toEqual(7, "should have 7 messages now");
    });
  });
  
  it('should support DoCheck hook', function () {
    var doCheckViewEle = element.all(by.css('do-check div')).get(0);
    var inputEles = element.all(by.css('do-check-parent input'));
    var heroNameInputEle = inputEles.get(1);
    var powerInputEle = inputEles.get(0);
    var titleEle = doCheckViewEle.element(by.css('p'));
    var changeLogEles = doCheckViewEle.all(by.css('div'));
    var logCount;
    
    expect(titleEle.getText()).toContain('Windstorm can sing');
    changeLogEles.count().then(function(count) {
      // Empirically 5 messages to start
      expect(count).toBeGreaterThan(4, "should start with some messages");
      logCount = count;
      // heroNameInputEle.sendKeys('-foo-').then(function () {
      return sendKeys(heroNameInputEle, '-foo-')
    }).then(function () {
      expect(titleEle.getText()).toContain('Windstorm-foo- can sing');
      return changeLogEles.count()
    }).then(function (count) {
      // two more for each keystroke except the 1st
      expect(count).toEqual(logCount + 9, 'should add 9 more messages')
      logCount = count;
      // return powerInputEle.sendKeys('-bar-');
      return sendKeys(powerInputEle, '-bar-');
    }).then(function () {
      expect(titleEle.getText()).toContain('Windstorm-foo- can sing-bar-');
      // 7 == 2 previously + length of '-bar-'
      expect(changeLogEles.count()).toEqual(logCount + 15, 'should add 15 more messages');
    });
  });
  
  it('should support AfterView hooks', function () {
    var parentEle = element(by.tagName('after-view-parent'));
    var buttonEle = parentEle.element(by.tagName('button')); // Reset
    var commentEle = parentEle.element(by.className('comment'));    
    var logEles = parentEle.all(by.css('h4 ~ div'));
    var childViewInputEle = parentEle.element(by.css('my-child input'));
    var logCount;
    
    expect(childViewInputEle.getAttribute('value')).toContain('Magneta');
    expect(commentEle.isPresent()).toBe(false, 'comment should not be in DOM');

    logEles.count().then(function(count) {
      logCount = count;
      return sendKeys(childViewInputEle, "-test-");
    }).then(function() {
      expect(childViewInputEle.getAttribute('value')).toContain('-test-');
      expect(commentEle.isPresent()).toBe(true,'should have comment because >10 chars');      
      expect(commentEle.getText()).toContain('long name');
      return logEles.count();
    }).then(function(count) {
      expect(logCount + 10).toEqual(count, "10 additional log messages should have been added");
      logCount = count;
      return buttonEle.click();
    }).then(function() {
      expect(logEles.count()).toBeLessThan(logCount, "log should shrink after reset");
    });
  });


  it('should support AfterContent hooks', function () {
    var parentEle = element(by.tagName('after-content-parent'));
    var buttonEle = parentEle.element(by.tagName('button')); // Reset
    var commentEle = parentEle.element(by.className('comment'));    
    var logEles = parentEle.all(by.css('h4 ~ div'));
    var childViewInputEle = parentEle.element(by.css('my-child input'));
    var logCount;
    
    expect(childViewInputEle.getAttribute('value')).toContain('Magneta');
    expect(commentEle.isPresent()).toBe(false, 'comment should not be in DOM');

    logEles.count().then(function(count) {
      logCount = count;
      return sendKeys(childViewInputEle, "-test-");
    }).then(function() {
      expect(childViewInputEle.getAttribute('value')).toContain('-test-');
      expect(commentEle.isPresent()).toBe(true,'should have comment because >10 chars');      
      expect(commentEle.getText()).toContain('long name');
      return logEles.count();
    }).then(function(count) {
      expect(logCount + 10).toEqual(count, "10 additional log messages should have been added");
      logCount = count;
      return buttonEle.click();
    }).then(function() {
      expect(logEles.count()).toBeLessThan(logCount, "log should shrink after reset");
    });
  });

  it('should support spy\'s OnInit & OnDestroy hooks', function () {
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

  it('should support "spy counter"', function () {
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
