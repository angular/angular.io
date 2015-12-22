// Not yet complete
describe('Lifecycle hooks', function () {

  beforeEach(function () {
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
    heroNameInputEle.sendKeys('-foo-').then(function () {
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

  // Hack - because of bug with send keys
  function sendKeys(element, str) {
    return str.split('').reduce(function (promise, char) {
      return promise.then(function () {
        return element.sendKeys(char);
      });
    }, element.getAttribute('value'));
    // better to create a resolved promise here but ... don't know how with protractor;
  }


});
