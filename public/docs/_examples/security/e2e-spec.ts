/// <reference path="../_protractor/e2e.d.ts" />
describe('Content Security E2E Tests', () => {

  beforeAll(function () {
    browser.get('');
  });

  // These tests will pass only if there is no pending alert to obscure the page

  it(`evil-binding should sanitize script tags`, () => {
    let paras = element.all(by.css('evil-binding p'));
    expect(paras.get(0).getText())
      .toContain('Template <script>alert("evil never sleeps")</script>Syntax');
    expect(paras.get(1).getText())
      .toContain('Template Syntax');
  });

  it(`evil-string should have only safe messages`, () => {
    let elem = element(by.css('evil-string'));
    expect(elem.getText()).toContain('Evil lurks');
    expect(elem.getText()).toContain('so beautiful');
  });

  it(`evil-template should have only a safe message`, () => {
    let elem = element(by.css('evil-template'));
    expect(elem.getText()).toContain('Happiness');
  });
});
