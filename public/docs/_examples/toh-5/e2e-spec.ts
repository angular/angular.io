/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('Tutorial', function () {

  beforeAll(function () {
    browser.get('');
  });

  function getPageStruct() {
    let hrefEles = element.all(by.css('my-app a'));

    return {
      hrefs: hrefEles,
      myDashboardHref: hrefEles.get(0),
      myDashboardParent: element(by.css('my-app my-dashboard')),
      topHeroes: element.all(by.css('my-app my-dashboard .module.hero')),

      myHeroesHref: hrefEles.get(1),
      myHeroesParent: element(by.css('my-app my-heroes')),
      allHeroes: element.all(by.css('my-app my-heroes li')),

      heroDetail: element(by.css('my-app my-hero-detail'))
    };
  }

  it('should be able to see the start screen', function () {
    let page = getPageStruct();
    expect(page.hrefs.count()).toEqual(2, 'should be two dashboard choices');
    expect(page.myDashboardHref.getText()).toEqual('Dashboard');
    expect(page.myHeroesHref.getText()).toEqual('Heroes');
  });

  it('should be able to see dashboard choices', function () {
    let page = getPageStruct();
    expect(page.topHeroes.count()).toBe(4, 'should be 4 dashboard hero choices');
  });

  it('should be able to toggle the views', function () {
    let page = getPageStruct();

    expect(page.myDashboardParent.element(by.css('h3')).getText()).toEqual('Top Heroes');
    page.myHeroesHref.click().then(function() {
      expect(page.myDashboardParent.isPresent()).toBe(false, 'should no longer see dashboard element');
      expect(page.allHeroes.count()).toBeGreaterThan(4, 'should be more than 4 heroes shown');
      return page.myDashboardHref.click();
    }).then(function() {
      expect(page.myDashboardParent.isPresent()).toBe(true, 'should once again see the dashboard element');
    });

  });

  it('should be able to edit details from "Dashboard" view', function () {
    let page = getPageStruct();
    expect(page.myDashboardParent.isPresent()).toBe(true, 'dashboard element should be available');
    let heroEle = page.topHeroes.get(3);
    let heroDescrEle = heroEle.element(by.css('h4'));
    let heroDescr: string;
    return heroDescrEle.getText().then(function(text) {
      heroDescr = text;
      return heroEle.click();
    }).then(function() {
      return editDetails(page, heroDescr, '-foo');
    }).then(function() {
      expect(page.myDashboardParent.isPresent()).toBe(true, 'dashboard element should be back');
      expect(heroDescrEle.getText()).toEqual(heroDescr + '-foo');
    });
  });

  it('should be able to edit details from "Heroes" view', function () {
    let page = getPageStruct();
    expect(page.myDashboardParent.isPresent()).toBe(true, 'dashboard element should be present');
    let viewDetailsButtonEle = page.myHeroesParent.element(by.cssContainingText('button', 'View Details'));
    let heroEle: protractor.ElementFinder;
    let heroDescr: string;
    page.myHeroesHref.click().then(function() {
      expect(page.myDashboardParent.isPresent()).toBe(false, 'dashboard element should NOT be present');
      expect(page.myHeroesParent.isPresent()).toBe(true, 'myHeroes element should be present');
      expect(viewDetailsButtonEle.isPresent()).toBe(false, 'viewDetails button should not yet be present');
      heroEle = page.allHeroes.get(2);
      return heroEle.getText();
    }).then(function(text) {
      // remove leading 'id' from the element
      heroDescr = text.substr(text.indexOf(' ') + 1);
      return heroEle.click();
    }).then(function() {
      expect(viewDetailsButtonEle.isDisplayed()).toBe(true, 'viewDetails button should now be visible');
      return viewDetailsButtonEle.click();
    }).then(function() {
      return editDetails(page, heroDescr, '-bar');
    }).then(function() {
      expect(page.myHeroesParent.isPresent()).toBe(true, 'myHeroes element should be back');
      expect(heroEle.getText()).toContain(heroDescr + '-bar');
      expect(viewDetailsButtonEle.isPresent()).toBe(false, 'viewDetails button should again NOT be present');
    });
  });

  function editDetails(page: any, origValue: string, textToAdd: string) {
    expect(page.myDashboardParent.isPresent()).toBe(false, 'dashboard element should NOT be present');
    expect(page.myHeroesParent.isPresent()).toBe(false, 'myHeroes element should NOT be present');
    expect(page.heroDetail.isDisplayed()).toBe(true, 'should be able to see hero-details');
    let inputEle = page.heroDetail.element(by.css('input'));
    expect(inputEle.isDisplayed()).toBe(true, 'should be able to see the input box');
    let backButtonEle = page.heroDetail.element(by.css('button'));
    expect(backButtonEle.isDisplayed()).toBe(true, 'should be able to see the back button');
    let detailTextEle = page.heroDetail.element(by.css('div h2'));
    expect(detailTextEle.getText()).toContain(origValue);
    return sendKeys(inputEle, textToAdd).then(function () {
      expect(detailTextEle.getText()).toContain(origValue + textToAdd);
      return backButtonEle.click();
    });
  }

});
