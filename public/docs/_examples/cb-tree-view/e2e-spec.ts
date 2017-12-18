/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
/* tslint:disable:quotemark */
describe('Tree View', function () {

    beforeEach(function () {
      browser.get('');
    });

    it('should expand and collapse all nodes', function(){
      let expandAll = element(by.xpath('//button[text()="Expand All"]'));
      let collapseAll = element(by.xpath('//button[text()="Collapse All"]'));

      expandAll.click()
        .then(function(){
          expect(findHeroCount('Dr IQ')).toBe(1);
          expect(findHeroCount('Bombasto')).toBe(1);
          expect(findHeroCount('Celeritas')).toBe(1);
          expect(findHeroCount('RubberMan')).toBe(1);
          expect(findHeroCount('Tornado')).toBe(1);
          expect(findHeroCount('Dynama')).toBe(2);
          expect(findHeroCount('Magma')).toBe(1);
      });

      collapseAll.click()
        .then(function(){
          expect(findHeroCount('Dr IQ')).toBe(0);
          expect(findHeroCount('Bombasto')).toBe(0);
          expect(findHeroCount('Celeritas')).toBe(0);
          expect(findHeroCount('RubberMan')).toBe(0);
          expect(findHeroCount('Tornado')).toBe(0);
          expect(findHeroCount('Dynama')).toBe(0);
          expect(findHeroCount('Magma')).toBe(0);
      });
    });

    function findHeroCount(name: string) {
      let length = element.all(by.xpath('//div[text()="Name: ' + name + '"]')).count();
      return length;
    }

    it('should add hero', function () {
      let usaNode = element.all(by.xpath('//a[text()="USA"]')).get(0);

      usaNode.click().then(function() {
        let name = element(by.xpath('//input[@placeholder="name"]'));

        let rating = element(by.xpath('//input[@placeholder="ranking"]'));

        name.sendKeys('New Hero');
        rating.sendKeys('10');

        let addButton = element(by.xpath('//button[text()="Add Hero"]'));
        return addButton.click();
      })
      .then(function(){
        let name = element(by.xpath('//div[text()="name: New Hero"]'));
        expect(name).toBeDefined();

        let rating = element(by.xpath('//div[text()="10"]'));
        expect(rating).toBeDefined();
      });
  });

});
