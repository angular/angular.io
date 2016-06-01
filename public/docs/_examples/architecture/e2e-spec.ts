/// <reference path='../_protractor/e2e.d.ts' />
describe('Architecture', function () {

  let title = 'Hero List';

  beforeAll(function () {
    browser.get('');
  });

  function itReset(name: string, func: () => any) {
    it(name, function() {
      browser.get('').then(func);
    });
  }

  it(`should display correct title: ${title}`, function () {
    expect(element(by.css('h2')).getText()).toEqual(title);
  });

  it('should display correct detail after selection', function() {
    let detailView = element(by.css('hero-detail'));
    expect(detailView.isPresent()).toBe(false);
    // select the 2nd element
    let selectEle = element.all(by.css('hero-list > div')).get(1);
    selectEle.click().then(function() {
      return selectEle.getText();
    }).then(function(selectedHeroName) {
      // works but too specific if we change the app
      // expect(selectedHeroName).toEqual('Mr. Nice');
      expect(detailView.isDisplayed()).toBe(true);
      let detailTitleEle = element(by.css('hero-detail > h4'));
      expect(detailTitleEle.getText()).toContain(selectedHeroName);
    });
  });

  itReset('should display correct detail after modification', function() {
    let detailView = element(by.css('hero-detail'));
    expect(detailView.isPresent()).toBe(false);
    // select the 2nd element
    let selectEle = element.all(by.css('hero-list > div')).get(1);
    selectEle.click().then(function () {
      return selectEle.getText();
    }).then(function (selectedHeroName) {
      let detailTitleEle = element(by.css('hero-detail > h4'));
      expect(detailTitleEle.getText()).toContain(selectedHeroName);
      let heroNameEle = element.all(by.css('hero-detail input')).get(0);

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
  });

});
