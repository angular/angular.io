/// <reference path='../_protractor/e2e.d.ts' />
'use strict';
describe('Style Guide', function () {
  it('01-01', function () {
    browser.get('#/01-01');

    let pre = element(by.tagName('toh-heroes > pre'));
    expect(pre.getText()).toContain('Bombasto');
    expect(pre.getText()).toContain('Tornado');
    expect(pre.getText()).toContain('Magneta');
  });

  it('02-07', function () {
    browser.get('#/02-07');

    let hero = element(by.tagName('toh-hero > div'));
    let users = element(by.tagName('admin-users > div'));

    expect(hero.getText()).toBe('hero component');
    expect(users.getText()).toBe('users component');
  });

  it('02-08', function () {
    browser.get('#/02-08');

    let input = element(by.tagName('input[tohvalidate]'));
    expect(input.isPresent()).toBe(true);
  });

  it('03-01', function () {
    browser.get('#/03-01');

    let div = element(by.tagName('sg-app > div'));
    expect(div.getText()).toBe('The expected error is 42');
  });

  it('03-02', function () {
    browser.get('#/03-02');

    let divs = element.all(by.tagName('sg-app > div'));
    expect(divs.get(0).getText()).toBe('Heroes url: api/heroes');
    expect(divs.get(1).getText()).toBe('Villains url: api/villains');
  });

  it('03-03', function () {
    browser.get('#/03-03');

    let div = element(by.tagName('sg-app > div'));
    expect(div.getText()).toBe('Our hero is RubberMan and He is so elastic');
  });

  it('03-04', function () {
    browser.get('#/03-04');

    let buttons = element.all(by.tagName('sg-app > button'));
    expect(buttons.get(0).getText()).toBe('Show toast');
    expect(buttons.get(1).getText()).toBe('Hide toast');
  });

  it('03-05', function () {
    browser.get('#/03-05');

    let div = element(by.tagName('sg-app > div'));
    expect(div.getText()).toBe('Actual favorite: Windstorm');

    let lis = element.all(by.tagName('sg-app > ul > li'));
    expect(lis.get(0).getText()).toBe('Windstorm');
    expect(lis.get(1).getText()).toBe('Bombasto');
    expect(lis.get(2).getText()).toBe('Magneta');
    expect(lis.get(3).getText()).toBe('Tornado');
  });

  it('03-06', function () {
    browser.get('#/03-06');

    let div = element(by.tagName('sg-app > div'));
    expect(div.getText()).toBe('Actual favorite: Windstorm');

    let lis = element.all(by.tagName('sg-app > ul > li'));
    expect(lis.get(0).getText()).toBe('Windstorm');
    expect(lis.get(1).getText()).toBe('Bombasto');
    expect(lis.get(2).getText()).toBe('Magneta');
    expect(lis.get(3).getText()).toBe('Tornado');
  });

  it('04-10', function () {
    browser.get('#/04-10');

    let div = element(by.tagName('sg-app > toh-heroes > div'));
    expect(div.getText()).toBe('This is heroes component');
  });

  it('04-14', function () {
    browser.get('#/04-14');

    let h2 = element(by.tagName('sg-app > toh-heroes > div > h2'));
    expect(h2.getText()).toBe('My Heroes');
  });

  it('05-02', function () {
    browser.get('#/05-02');

    let button = element(by.tagName('sg-app > toh-hero-button > button'));
    expect(button.getText()).toBe('Hero button');
  });

  it('05-03', function () {
    browser.get('#/05-03');

    let button = element(by.tagName('sg-app > toh-hero-button > button'));
    expect(button.getText()).toBe('Hero button');
  });

  it('05-04', function () {
    browser.get('#/05-04');

    let h2 = element(by.tagName('sg-app > toh-heroes > div > h2'));
    expect(h2.getText()).toBe('My Heroes');
  });

  it('05-12', function () {
    browser.get('#/05-12');

    let button = element(by.tagName('sg-app > toh-hero-button > button'));
    expect(button.getText()).toBe('OK');
  });

  it('05-13', function () {
    browser.get('#/05-13');

    let button = element(by.tagName('sg-app > toh-hero-button > button'));
    expect(button.getText()).toBe('OK');
  });

  it('05-14', function () {
    browser.get('#/05-14');

    let toast = element(by.tagName('sg-app > toh-toast'));
    expect(toast.getText()).toBe('...');
  });

  it('05-15', function () {
    browser.get('#/05-15');

    let heroList = element(by.tagName('sg-app > toh-hero-list'));
    expect(heroList.getText()).toBe('...');
  });

  it('05-16', function () {
    browser.get('#/05-16');

    let hero = element(by.tagName('sg-app > toh-hero'));
    expect(hero.getText()).toBe('...');
  });

  it('05-17', function () {
    browser.get('#/05-17');

    let section = element(by.tagName('sg-app > toh-hero-list > section'));
    expect(section.getText()).toContain('Our list of heroes');
    expect(section.getText()).toContain('Total powers');
    expect(section.getText()).toContain('Average power');
  });

  it('06-01', function () {
    browser.get('#/06-01');

    let div = element(by.tagName('sg-app > div[tohhighlight]'));
    expect(div.getText()).toBe('Bombasta');
  });

  it('06-03', function () {
    browser.get('#/06-03');

    let input = element(by.tagName('input[tohvalidator]'));
    expect(input.isPresent()).toBe(true);
  });

  it('07-01', function () {
    browser.get('#/07-01');

    let lis = element.all(by.tagName('sg-app > ul > li'));
    expect(lis.get(0).getText()).toBe('Windstorm');
    expect(lis.get(1).getText()).toBe('Bombasto');
    expect(lis.get(2).getText()).toBe('Magneta');
    expect(lis.get(3).getText()).toBe('Tornado');
  });

  it('07-03', function () {
    browser.get('#/07-03');

    let pre = element(by.tagName('toh-heroes > pre'));
    expect(pre.getText()).toContain('[]');
  });

  it('07-04', function () {
    browser.get('#/07-04');

    let pre = element(by.tagName('toh-app > pre'));
    expect(pre.getText()).toContain('[]');
  });

  it('09-01', function () {
    browser.get('#/09-01');

    let button = element(by.tagName('sg-app > toh-hero-button > button'));
    expect(button.getText()).toBe('OK');
  });

  it('11-01', function () {
    browser.get('#/11-01');

    let div = element(by.tagName('sg-app div'));
    expect(div.getText()).toBe('I am a page set to US English');
  });

  it('11-02', function () {
    browser.get('#/11-02');

    let labels = element.all(by.tagName('sg-app label'));
    expect(labels.get(0).getText()).toBe('Name:');
    expect(labels.get(1).getText()).toBe('Surname:');
    let inputs = element.all(by.tagName('sg-app label input'));
    expect(inputs.get(0).isPresent()).toBe(true);
    expect(inputs.get(1).isPresent()).toBe(true);
  });

  it('11-03', function () {
    browser.get('#/11-03');

    let button = element(by.tagName('sg-app button'));
    expect(button.getText()).toBe('Press me');
  });

  it('11-05', function () {
    browser.get('#/11-05');

    let dts = element.all(by.tagName('sg-app dt'));
    expect(dts.get(0).getText()).toBe('Name:');
    expect(dts.get(1).getText()).toBe('Power:');
    let dds = element.all(by.tagName('sg-app dd'));
    expect(dds.get(0).getText()).toBe('Windstorm');
    expect(dds.get(1).getText()).toBe('Air');
  });

  it('11-06', function () {
    browser.get('#/11-06');

    let labels = element.all(by.tagName('sg-app label'));
    expect(labels.get(0).getText()).toBe('Name:');
    expect(labels.get(1).getText()).toBe('Air');
    expect(labels.get(2).getText()).toBe('Fire');
    expect(labels.get(3).getText()).toBe('Name:');
    expect(labels.get(4).getText()).toBe('Air');
    expect(labels.get(5).getText()).toBe('Fire');
    let legends = element.all(by.tagName('fieldset legend'));
    expect(legends.get(0).getText()).toBe('Power options');
    expect(legends.get(1).getText()).toBe('Power options');
    let inputs = element.all(by.css('sg-app input:not([type="radio"])'));
    expect(inputs.get(0).isPresent()).toBe(true);
    expect(inputs.get(1).isPresent()).toBe(true);
    let radios = element.all(by.css('sg-app input[type="radio"]'));
    expect(radios.get(0).isPresent()).toBe(true);
    expect(radios.get(1).isPresent()).toBe(true);
    expect(radios.get(2).isPresent()).toBe(true);
    expect(radios.get(3).isPresent()).toBe(true);
  });

  it('11-07', function () {
    browser.get('#/11-07');

    let button = element(by.tagName('sg-app button'));
    expect(button.getText()).toBe('Alert User');
    let anchor = element(by.tagName('sg-app a'));
    expect(anchor.getText()).toBe('Go to Angular!');
  });

  it('11-08', function () {
    browser.get('#/11-08');

    let ths = element.all(by.tagName('sg-app th'));
    expect(ths.get(0).getText()).toBe('Hero Id');
    expect(ths.get(1).getText()).toBe('Hero Name');
    expect(ths.get(2).getText()).toBe('Delete Hero');
    let trs = element.all(by.tagName('sg-app tr'));
    let row1Tds = trs.get(0).all(by.tagName('td'));
    expect(row1Tds.get(0).getText()).toBe('1');
    expect(row1Tds.get(1).getText()).toBe('Windstorm');
    let row2Tds = trs.get(1).all(by.tagName('td'));
    expect(row2Tds.get(0).getText()).toBe('2');
    expect(row2Tds.get(1).getText()).toBe('Bombasto');
    let row3Tds = trs.get(2).all(by.tagName('td'));
    expect(row3Tds.get(0).getText()).toBe('3');
    expect(row3Tds.get(1).getText()).toBe('Magneta');
    let row4Tds = trs.get(3).all(by.tagName('td'));
    expect(row4Tds.get(0).getText()).toBe('4');
    expect(row4Tds.get(1).getText()).toBe('Tornado');
    let buttons = element.all(by.tagName('sg-app td button'));
    expect(buttons.get(0).getText()).toBe('Delete Windstorm');
    expect(buttons.get(1).getText()).toBe('Delete Bombasto');
    expect(buttons.get(2).getText()).toBe('Delete Magneta');
    expect(buttons.get(3).getText()).toBe('Delete Tornado');
  });

  it('11-09', function () {
    browser.get('#/11-09');

    let image = element(by.tagName('sg-app img'));
    expect(image.getAttribute('alt')).toBe('Angular 2 logo');
  });

  it('11-11', function () {
    browser.get('#/11-11');

    let span = element(by.css('sg-app span.green-background'));
    expect(span.getText()).toBe('Current status is OK!');
  });

});
