/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('TypeScript to Javascript tests', function () {

  beforeAll(function () {
    browser.get('');
  });

  it('should display the basic component example', function () {
    testTag('hero-view', 'Hero: Windstorm');
  });

  it('should display the component example with lifecycle methods', function () {
    testTag('hero-lifecycle', 'Hero: Windstorm');
  });

  it('should display component with DI example', function () {
    testTag('hero-di', 'Hero: Windstorm');
  });

  it('should display component with DI using @Inject example', function () {
    testTag('hero-di-inject', 'Hero: Windstorm');
  });

  it('should support optional, attribute, and query injections', function () {
    let app = element(by.css('hero-di-inject-additional'));
    let h1 = app.element(by.css('h1'));
    let okMsg = app.element(by.css('.ok-msg'));

    expect(h1.getText()).toBe('Tour of Heroes');
    app.element(by.buttonText('OK')).click();
    expect(okMsg.getText()).toBe('OK!');
  });

  it('should support component with inputs and outputs', function () {
    let app = element(by.css('hero-io'));
    let confirmComponent = app.element(by.css('my-confirm'));

    confirmComponent.element(by.buttonText('OK')).click();
    expect(app.element(by.cssContainingText('span', 'OK clicked')).isPresent()).toBe(true);

    confirmComponent.element(by.buttonText('Cancel')).click();
    expect(app.element(by.cssContainingText('span', 'Cancel clicked')).isPresent()).toBe(true);
  });

  it('should support host bindings and host listeners', function() {
    let app = element(by.css('heroes-bindings'));
    let h1 = app.element(by.css('h1'));

    expect(app.getAttribute('class')).toBe('heading');
    expect(app.getAttribute('title')).toBe('Tooltip content');

    h1.click();
    expect(h1.getAttribute('class')).toBe('active');

    h1.click();
    browser.actions().doubleClick(h1 as any as webdriver.WebElement).perform();
    expect(h1.getAttribute('class')).toBe('active');
  });

  it('should support content and view queries', function() {
    let app = element(by.css('heroes-queries'));
    let windstorm = app.element(by.css('a-hero:first-child'));

    app.element(by.buttonText('Activate')).click();
    expect(windstorm.element(by.css('h2')).getAttribute('class')).toBe('active');
    expect(windstorm.element(by.css('active-label')).getText()).toBe('Active');
  });

  function testTag(selector: string, expectedText: string) {
    let component = element(by.css(selector));
    expect(component.getText()).toBe(expectedText);
  }

});
