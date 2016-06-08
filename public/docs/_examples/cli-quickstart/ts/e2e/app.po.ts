export class CliQuickstartPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('cli-quickstart-app h1')).getText();
  }
}
