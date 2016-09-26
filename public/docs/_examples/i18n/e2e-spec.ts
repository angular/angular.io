/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('i18n E2E Tests', function () {

  beforeEach(function () {
    browser.get('');
  });

  it('should display i18n translated welcome: Bonjour i18n!', function () {
    expect(element(by.css('h1')).getText()).toEqual('Bonjour i18n!');
  });

});
