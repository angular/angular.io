/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('Hierarchical dependency injection', function () {

  beforeEach(function () {
    browser.get('');
  });

  it('should open with a card view', function () {
    expect(element.all(by.cssContainingText('button', 'edit')).get(0).isDisplayed()).toBe(true,
      'edit button should be displayed');
  });

  it('should have multiple heroes listed', function () {
    expect(element.all(by.css('heroes-list li')).count()).toBeGreaterThan(1);
  });

  it('should change to editor view after selection', function () {
    let editButtonEle = element.all(by.cssContainingText('button', 'edit')).get(0);
    editButtonEle.click().then(function() {
      expect(editButtonEle.isDisplayed()).toBe(false, 'edit button should be hidden after selection');
    });
  });

  it('should be able to save editor change', function () {
    testEdit(true);
  });

  it('should be able to cancel editor change', function () {
    testEdit(false);
  });

  function testEdit(shouldSave: boolean) {
    // select 2nd ele
    let heroEle = element.all(by.css('heroes-list li')).get(1);
    // get the 2nd span which is the name of the hero
    let heroNameEle = heroEle.all(by.css('hero-card span')).get(1);
    let editButtonEle = heroEle.element(by.cssContainingText('button', 'edit'));
    editButtonEle.click().then(function() {
      let inputEle = heroEle.element(by.css('hero-editor input'));
      // return inputEle.sendKeys("foo");
      return sendKeys(inputEle, 'foo');
    }).then(function() {
      let buttonName = shouldSave ? 'save' : 'cancel';
      let buttonEle = heroEle.element(by.cssContainingText('button', buttonName));
      return buttonEle.click();
    }).then(function() {
      if (shouldSave) {
        expect(heroNameEle.getText()).toContain('foo');
      } else {
        expect(heroNameEle.getText()).not.toContain('foo');
      }
    });
  }


});
