'use strict';

import { browser, element, by } from 'protractor';

/* tslint:disable:quotemark */
describe('Drag and Drop', function () {

  beforeAll(function () {
    browser.get('');
  });

  it('should drag hero to assignment', function () {

    let assignment1 = element.all(by.css('.assignment')).get(0);

    let hero1 = element.all(by.css('.hero')).get(0);

    browser.actions()
           .dragAndDrop(hero1 as any as webdriver.WebElement,
                        assignment1 as any as webdriver.WebElement)
           .perform();

    let heroAssignment = element.all(by.xpath('//div[text()="Help Granny cross the street"]/following-sibling::ul/li[text()="Mr. Nice"]'));
    expect(heroAssignment.count()).toBe(1);

    let doneButton = element(by.xpath('//div[@data-hero="Mr. Nice"]/div/button'));

    // Remove Mr. Nice
    doneButton.click().then(function(){
      let remainingHeroes = element.all(by.css('.hero'));
      expect(remainingHeroes.count()).toBe(3);
    });
  });
});
