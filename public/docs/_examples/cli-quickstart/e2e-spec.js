// gulp run-e2e-tests --filter=cli-quickstart
describe('angular2-cli-quickstart App', () => {
  beforeEach(() => {
    return browser.get('/');
  })

  it('should display message saying app works', () => {
    var pageTitle = element(by.css('angular2-cli-quickstart-app h1')).getText()
    expect(pageTitle).toEqual('My First Angular 2 App');
  });
});
