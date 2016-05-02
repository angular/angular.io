export class Angular2CliQuickstartPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angular2-cli-quickstart-app h1')).getText();
  }
}
