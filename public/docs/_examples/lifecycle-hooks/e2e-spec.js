// Not yet complete
describe('Lifecycle hooks', function () {

  beforeEach(function () {
    browser.get('');
  });

  it('should open correctly', function () {
    expect(element.all(by.css('h2')).get(0).getText()).toEqual('Peek-A-Boo');
  });

  it('should be able to press peek-a-boo button', function () {
    var pabComp = element(by.css('peek-a-boo-parent peek-a-boo'));
    expect(pabComp.isPresent()).toBe(false, "should not be able to find the 'peek-a-boo' component");
    var pabButton = element.all(by.css('peek-a-boo-parent button')).get(0);
    var updateHeroButton = element.all(by.css('peek-a-boo-parent button')).get(1);
    expect(pabButton.getText()).toContain('Create Peek');
    pabButton.click().then(function() {
      expect(pabButton.getText()).toContain('Destroy Peek');
      expect(pabComp.isDisplayed()).toBe(true, "should be able to see the 'peek-a-boo' component");
      expect(pabComp.getText()).toContain('Windstorm');
      expect(pabComp.getText()).not.toContain('Windstorm!');
      expect(updateHeroButton.isPresent()).toBe(true, "should be able to see the update hero button");
      return updateHeroButton.click();
    }).then(function() {
      expect(pabComp.getText()).toContain('Windstorm!');
      return pabButton.click();
    }).then(function() {
      expect(pabComp.isPresent()).toBe(false, "should no longer be able to find the 'peek-a-boo' component");
    });
  });

});
