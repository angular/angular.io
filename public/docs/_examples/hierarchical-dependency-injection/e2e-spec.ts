'use strict'; // necessary for es6 output in node

import { browser, by, element } from 'protractor';

describe('Hierarchical dependency injection', () => {

  beforeAll(() => {
    browser.get('');
  });

  describe('Heroes Scenario', () => {
    let page = {
      heroName: '',
      heroText: '',

      // queries
      heroEl: element.all(by.css('heroes-list li')).get(0), // first hero
      heroCardEl: element(by.css('heroes-list hero-card')), // first hero card
      cardNameInputEl: element.all(by.css('heroes-list hero-card input')).get(0),
      cancelButtonEl: element(by.cssContainingText('heroes-list hero-card button', 'Cancel')),
      closeButtonEl: element(by.cssContainingText('heroes-list hero-card button', 'Close')),
      saveButtonEl: element(by.cssContainingText('heroes-list hero-card button', 'Save'))
    };

    it('should list multiple heroes', () => {
      expect(element.all(by.css('heroes-list li')).count()).toBeGreaterThan(1);
    });

    it('should show no hero cards at the start', () => {
      expect(element.all(by.css('heroes-list li hero-card')).count()).toBe(0);
    });

    it('should open first hero in hero-card view after click', () => {
      page.heroEl.getText()
        .then(val => {
          // console.log('Selected hero text: ' + val);
          page.heroText = val;
          page.heroName = val.substring(0, val.indexOf('()') - 1);
        })
        .then(() => page.heroEl.click())
        .then(() => {
          expect(page.heroCardEl.isDisplayed()).toBe(true);
        });
    });

    it('hero card should have first hero\'s name', () => {
      // Not `page.cardNameInputEl.getAttribute('value')` although later that is essential
      expect(page.cardNameInputEl.getText()).toEqual(page.heroName);
    });

    it('should be able to cancel change', () => {
      page.cardNameInputEl.sendKeys('foo')
        .then(() => {
          expect(page.cardNameInputEl.getAttribute('value')).toContain('foo', 'input name should have foo');
          expect(page.heroEl.getText()).toEqual(page.heroText, 'list text should be unchanged');
          return page.cancelButtonEl.click();
        })
        .then(() => {
          expect(page.cardNameInputEl.getAttribute('value')).not.toContain('foo', 'input name should not have foo');
          expect(page.heroEl.getText()).toEqual(page.heroText, 'list text should be unchanged');
        });
    });

    it('should be able to save change', () => {
      page.cardNameInputEl.sendKeys('bar')
        .then(() => {
          expect(page.cardNameInputEl.getAttribute('value')).toContain('bar', 'input name should have bar');
          expect(page.heroEl.getText()).toEqual(page.heroText, 'list text should be unchanged');
          return page.saveButtonEl.click();
        })
        .then(() => {
          expect(page.cardNameInputEl.getAttribute('value')).toContain('bar', 'input name should still have bar');
          expect(page.heroEl.getText()).toContain('bar', 'list text should have changed to include bar');
        });
    });

    it('should be able to close card', () => {
      page.saveButtonEl.click()
        .then(() => {
          expect(element.all(by.css('heroes-list li hero-card')).count()).toBe(0);
        });
    });

  });

  describe('Villains Scenario', () => {
    it('should list multiple villains', () => {
      expect(element.all(by.css('villains-list li')).count()).toBeGreaterThan(1);
    });
  });

  describe('Cars Scenario', () => {

    it('A-component should use expected services', () => {
      expect(element(by.css('a-car')).getText()).toContain('C1-E1-T1');
    });

    it('B-component should use expected services', () => {
      expect(element(by.css('b-car')).getText()).toContain('C2-E2-T1');
    });

    it('C-component should use expected services', () => {
      expect(element(by.css('c-car')).getText()).toContain('C3-E2-T1');
    });
  });
});
