/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('cli-quickstart App', () => {
  beforeEach(() => {
    return browser.get('/');
  });

  it('should display message saying app works', () => {
    let pageTitle = element(by.css('cli-quickstart-app h1')).getText();
    expect(pageTitle).toEqual('My First Angular 2 App');
  });
});
