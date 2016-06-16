/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('Tutorial part 1', () => {

  let expectedH1 = 'Tour of Heroes';
  let expectedTitle = `Angular 2 ${expectedH1}`;
  let hero = { id: 1, name: 'Windstorm' };
  let expectedH2 = `${hero.name} details!`;

  beforeEach(() => {
    return browser.get('');
  });

  it(`should have title '${expectedTitle}'`, () => {
    expect(browser.getTitle()).toEqual(expectedTitle);
  });

  it(`should have '${expectedH2}'`, () => {
    let text = element(by.css('h2')).getText();
    expect(text).toEqual(expectedH2);
  });

  it(`should have input name '${hero.name}'`, () => {
    let name = element(by.css('input')).getAttribute('value');
    expect(name).toEqual(hero.name);
  });
});
