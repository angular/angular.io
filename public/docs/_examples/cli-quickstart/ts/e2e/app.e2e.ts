import { Angular2CliQuickstartPage } from './app.po';

describe('angular2-cli-quickstart App', function() {
  let page: Angular2CliQuickstartPage;

  beforeEach(() => {
    page = new Angular2CliQuickstartPage();
  });

  // #docregion title
  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('My First Angular 2 App');
  });
  // #enddocregion title
});
