/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('Azure AD Auth E2E tests', function () {

  let expectedMsg = 'Simple app demonstrates';

  beforeEach(function () {
    browser.get('');
  });

  it(`should display: ${expectedMsg}`, function () {
    expect(element(by.css('p')).getText()).toContain(expectedMsg);
  });

});
