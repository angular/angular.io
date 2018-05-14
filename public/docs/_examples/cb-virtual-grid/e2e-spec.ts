/// <reference path='../_protractor/e2e.d.ts' />
'use strict';

describe('Virtual Grid', function () {

    beforeEach(function () {
      browser.get('');
    });

    it('should sort the grid', function() {
      ValidateRankingColumn(['1000', '999', '998', '997', '996', '995', '994', '993', '992', '991', '990']);

      // click Ranking column and make sure values are sorted
      element(by.xpath('//tbody/tr[1]/td[3]')).click().then(function(){
        ValidateRankingColumn(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);
      });
    });

    function ValidateRankingColumn(range: string[]) {
      for (let i = 0; i < range.length; i++) {
        let rankCell = element.all(by.xpath('//tbody/tr[' + (i + 2) + ']/td[3]//input')).get(0);
        expect(rankCell.getAttribute('value')).toEqual(range[i]);
      }
    }

    it('should bind to new row but keep DOM constant', function () {

      let lastRowFirstTextCell = element(by.css('#cell10-0'));

      // check that the last row number in the grid is 10
      expect(element(by.xpath('//tbody/tr[12]/td[1][contains(text(),10)]')).isPresent()).toBe(true);

      let trs = element.all(by.xpath('//tbody/tr'));
      expect(trs.count()).toBe(12);

      lastRowFirstTextCell.click().then(function(){
        lastRowFirstTextCell.clear();
        lastRowFirstTextCell.sendKeys('New Hero');
        expect(lastRowFirstTextCell.getAttribute('value')).toEqual('New Hero');

        // page down one row  
        lastRowFirstTextCell.sendKeys(protractor.Key.ARROW_DOWN);
        // navigating does not increase the number of rows
        trs = element.all(by.xpath('//tbody/tr'));
        expect(trs.count()).toBe(12);
      });
  });
});

