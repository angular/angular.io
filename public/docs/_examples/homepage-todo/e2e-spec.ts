/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('Homepage Todo', function () {

  beforeAll(function () {
    browser.get('');
  });

  // Does it even launch?
  let expectedAppTitle = 'Todo';
  it(`should display app title: ${expectedAppTitle}`, function () {
    expect(element(by.css('h2')).getText()).toEqual(expectedAppTitle);
  });

});
