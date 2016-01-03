describe('Architecture', function () {

  var _title = "Hero List";

  beforeAll(function () {
    browser.get('');
  });

  function itReset(name, func) {
    it(name, function() {
      browser.get('').then(func);
    });
  }

  it('should display correct title: ' + _title, function () {
    expect(element(by.css('h2')).getText()).toEqual(_title);
  });

  it('should display correct detail after selection', function() {
    var detailView = element(by.css('hero-detail'));
    expect(detailView.isPresent()).toBe(false);
    // select the 2nd element
    var selectEle = element.all(by.css('hero-list > div')).get(1);
    selectEle.click().then(function() {
      return selectEle.getText();
    }).then(function(selectedHeroName) {
      // works but too specific if we change the app
      // expect(selectedHeroName).toEqual('Mr. Nice');
      expect(detailView.isDisplayed()).toBe(true);
      var detailTitleEle = element(by.css('hero-detail > h4'));
      expect(detailTitleEle.getText()).toContain(selectedHeroName);
    });
  })

  itReset('should display correct detail after modification', function() {
    var detailView = element(by.css('hero-detail'));
    expect(detailView.isPresent()).toBe(false);
    // select the 2nd element
    var selectEle = element.all(by.css('hero-list > div')).get(1);
    selectEle.click().then(function () {
      return selectEle.getText();
    }).then(function (selectedHeroName) {
      var detailTitleEle = element(by.css('hero-detail > h4'));
      expect(detailTitleEle.getText()).toContain(selectedHeroName);
      var heroNameEle = element.all(by.css('hero-detail input')).get(0);

      // check that both the initial selected item and the detail title reflect changes
      // made to the input box.
      // heroNameEle.sendKeys('foo');
      sendKeys(heroNameEle, 'foo');
      expect(detailTitleEle.getText()).toContain('foo');
      expect(selectEle.getText()).toContain('foo');

      // getText on an input element always returns null
      // http://stackoverflow.com/questions/20310442/how-to-gettext-on-an-input-in-protractor
      // expect(heroNameEle.getText()).toEqual(selectedHeroName);
      expect(heroNameEle.getAttribute('value')).toEqual(selectedHeroName + 'foo');
    });
  })

});
