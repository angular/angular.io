/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('Router', function () {

  beforeAll(function () {
    browser.get('');
  });

  function getPageStruct() {
    let hrefEles = element.all(by.css('my-app a'));

    return {
      hrefs: hrefEles,
      routerParent: element(by.css('my-app > undefined')),
      routerTitle: element(by.css('my-app > undefined > h2')),

      crisisHref: hrefEles.get(0),
      crisisList: element.all(by.css('my-app > undefined > undefined li')),
      crisisDetail: element(by.css('my-app > undefined > undefined > div')),
      crisisDetailTitle: element(by.css('my-app > undefined > undefined > div > h3')),

      heroesHref: hrefEles.get(1),
      heroesList: element.all(by.css('my-app > undefined li')),
      heroDetail: element(by.css('my-app > undefined > div')),
      heroDetailTitle: element(by.css('my-app > undefined > div > h3')),

      adminHref: hrefEles.get(2),
      loginHref: hrefEles.get(3)
    };
  }

  it('should be able to see the start screen', function () {
    let page = getPageStruct();
    expect(page.hrefs.count()).toEqual(4, 'should be two dashboard choices');
    expect(page.crisisHref.getText()).toEqual('Crisis Center');
    expect(page.heroesHref.getText()).toEqual('Heroes');
    expect(page.adminHref.getText()).toEqual('Crisis Admin');
    expect(page.loginHref.getText()).toEqual('Login');
  });

  it('should be able to see crises center items', function () {
    let page = getPageStruct();
    expect(page.crisisList.count()).toBe(4, 'should be 4 crisis center entries at start');
  });

  it('should be able to see hero items', function () {
    let page = getPageStruct();
    page.heroesHref.click().then(function() {
      expect(page.routerTitle.getText()).toContain('HEROES');
      expect(page.heroesList.count()).toBe(6, 'should be 6 heroes');
    });
  });

  it('should be able to toggle the views', function () {
    let page = getPageStruct();
    page.crisisHref.click().then(function() {
      expect(page.crisisList.count()).toBe(4, 'should be 4 crisis center entries');
      return page.heroesHref.click();
    }).then(function() {
      expect(page.heroesList.count()).toBe(6, 'should be 6 heroes');
    });
  });

  it('should be able to edit and save details from the crisis center view', function () {
    crisisCenterEdit(2, true);
  });

  xit('should be able to edit and cancel details from the crisis center view', function () {
    crisisCenterEdit(3, false);
  });

  it('should be able to edit and save details from the heroes view', function () {
    let page = getPageStruct();
    let heroEle: protractor.ElementFinder;
    let heroText: string;
    page.heroesHref.click().then(function() {
      heroEle = page.heroesList.get(4);
      return heroEle.getText();
    }).then(function(text) {
      expect(text.length).toBeGreaterThan(0, 'should have some text');
      // remove leading id from text
      heroText = text.substr(text.indexOf(' ')).trim();
      return heroEle.click();
    }).then(function() {
      expect(page.heroesList.count()).toBe(0, 'should no longer see crisis center entries');
      expect(page.heroDetail.isPresent()).toBe(true, 'should be able to see crisis detail');
      expect(page.heroDetailTitle.getText()).toContain(heroText);
      let inputEle = page.heroDetail.element(by.css('input'));
      return sendKeys(inputEle, '-foo');
    }).then(function() {
      expect(page.heroDetailTitle.getText()).toContain(heroText + '-foo');
      let buttonEle = page.heroDetail.element(by.css('button'));
      return buttonEle.click();
    }).then(function() {
      expect(heroEle.getText()).toContain(heroText + '-foo');
    });
  });

  function crisisCenterEdit(index: number, shouldSave: boolean) {
    let page = getPageStruct();
    let crisisEle: protractor.ElementFinder;
    let crisisText: string;
    page.crisisHref.click()
    .then(function () {
      crisisEle = page.crisisList.get(index);
      return crisisEle.getText();
    }).then(function (text) {
      expect(text.length).toBeGreaterThan(0, 'should have some text');
      // remove leading id from text
      crisisText = text.substr(text.indexOf(' ')).trim();
      return crisisEle.click();
    }).then(function () {
      expect(page.crisisList.count()).toBe(0, 'should no longer see crisis center entries');
      expect(page.crisisDetail.isPresent()).toBe(true, 'should be able to see crisis detail');
      expect(page.crisisDetailTitle.getText()).toContain(crisisText);
      let inputEle = page.crisisDetail.element(by.css('input'));
      return sendKeys(inputEle, '-foo');
    }).then(function () {
      expect(page.crisisDetailTitle.getText()).toContain(crisisText + '-foo');
      let buttonEle = page.crisisDetail.element(by.cssContainingText('button', shouldSave ? 'Save' : 'Cancel'));
      return buttonEle.click();
    }).then(function () {
      if (shouldSave) {
        expect(crisisEle.getText()).toContain(crisisText + '-foo');
      } else {
        expect(crisisEle.getText()).not.toContain(crisisText + '-foo');
      }
    });
  }

});
