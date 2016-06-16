/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('Documentation StyleGuide E2E Tests', function() {

  let expectedMsg = 'My First Angular 2 App';

  beforeEach(function () {
    browser.get('');
  });

  it('should display: ' + expectedMsg, function() {
    expect(element(by.id('output')).getText()).toEqual(expectedMsg);
  });
});
