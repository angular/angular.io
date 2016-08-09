/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('QuickStart E2E Tests', function () {

  let expectedMsg = 'Hello from Angular 2 App with Webpack';

  beforeEach(function () {
    browser.get('');
  });

  it(`should display: ${expectedMsg}`, function () {
    expect(element(by.css('h1')).getText()).toEqual(expectedMsg);
  });

  it('should display an image', function () {
    expect(element(by.css('img')).isPresent()).toBe(true);
  });

});
