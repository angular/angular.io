/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('Homepage Tabs', function () {

  beforeAll(function () {
    browser.get('');
  });

  // Does it even launch?
  let expectedAppTitle = 'Tabs Demo';
  it(`should display app title: ${expectedAppTitle}`, function () {
    expect(element(by.css('h4')).getText()).toEqual(expectedAppTitle);
  });

});
