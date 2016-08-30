/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
// FIRST RUN:       gulp run-e2e-tests --filter=cb-item-template
// SUBSEQUENT RUNS: gulp run-e2e-tests --filter=cb-item-template --fast
describe('Item template renderer', function () {

  beforeAll(function () {
    browser.get('');
  });

  it('should toggle the menu', function () {

    expect(element(by.className('select-items')).isPresent()).toBe(false);
    element(by.className('select-root')).click();
    expect(element(by.className('select-items')).isPresent()).toBe(true);
    element(by.className('select-root')).click();
    expect(element(by.className('select-items')).isPresent()).toBe(false);

  });

  it('should select last item', function () {

    // Make sure all menu roots start out with Black.
    element.all(by.className('select-root')).each(
      function iterator(element) {
        expect(element.getText()).toContain('Black');
      }
    );

    // Select Magenta.
    element(by.className('select-root')).click();
    element.all(by.css('ul.select-items li')).last().click();

    // Make sure all menu roots reflect selection (since they are sharing same model).
    element.all(by.className('select-root')).each(
      function iterator(element) {
        expect(element.getText()).toContain('Magenta');
      }
    );

  });

});
