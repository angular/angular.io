/// <reference path="../_protractor/e2e.d.ts" />
describe('cli-quickstart App', () => {
  beforeEach(() => {
    return browser.get('/');
  })

  it('should display message saying app works', () => {
    var pageTitle = element(by.css('cli-quickstart-app h1')).getText()
    expect(pageTitle).toEqual('My First Angular 2 App');
  });
});
