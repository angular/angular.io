describe('Hierarchical dependency injection', function () {

  beforeEach(function () {
    browser.get('');
  });

  it('should open with a card view', function () {
    expect(element.all(by.cssContainingText('button','edit')).get(0).isDisplayed()).toBe(true,
      "edit button should be displayed");
  });

  it('should have multiple heros listed', function () {
    expect(element.all(by.css('heroes-list li')).count()).toBeGreaterThan(1);
  });

  it('should change to editor view after selection', function () {
    var editButtonEle = element.all(by.cssContainingText('button','edit')).get(0);
    editButtonEle.click().then(function() {
      expect(editButtonEle.isDisplayed()).toBe(false, "edit button should be hidden after selection");
    })
  });

  it('should be able to save editor change', function () {
    testEdit(true);
  });

  it('should be able to cancel editor change', function () {
    testEdit(false);
  });

  function testEdit(shouldSave) {
    var inputEle;
    // select 2nd ele
    var heroEle = element.all(by.css('heroes-list li')).get(1);
    // get the 2nd span which is the name of the hero
    var heroNameEle = heroEle.all(by.css('hero-card span')).get(1);
    var editButtonEle = heroEle.element(by.cssContainingText('button','edit'));
    editButtonEle.click().then(function() {
      inputEle = heroEle.element(by.css('hero-editor input'));
      // return inputEle.sendKeys("foo");
      return sendKeys(inputEle, "foo");
    }).then(function() {
      buttonName = shouldSave ? 'save' : 'cancel';
      var buttonEle = heroEle.element(by.cssContainingText('button', buttonName));
      return buttonEle.click();
    }).then(function() {
      if (shouldSave) {
        expect(heroNameEle.getText()).toContain('foo');
      } else {
        expect(heroNameEle.getText()).not.toContain('foo');
      }
    })
  }


});
