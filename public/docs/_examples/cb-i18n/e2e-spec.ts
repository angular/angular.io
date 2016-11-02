'use strict'; // necessary for es6 output in node

import { browser, element, by } from 'protractor';

describe('i18n E2E Tests', () => {

  beforeEach(function () {
    browser.get('');
  });

  it('should display i18n translated welcome: ¡Hola i18n!', function () {
    expect(element(by.css('h1')).getText()).toEqual('¡Hola i18n!');
  });

  it('should display the node texts without elements', function () {
    expect(element(by.css('my-app')).getText()).toContain('No genero ningún elemento');
    expect(element(by.css('my-app')).getText()).toContain('Yo tampoco genero ningún elemento');
  });

  it('should display the translated alt attribute', function () {
    const alt = element(by.css('img')).getAttribute('alt');
    expect(alt).toBe('Logo de Angular 2');
  });

  it('should display the plural of: a horde of wolves', function () {
    expect(element.all(by.css('div')).get(0).getText()).toBe('una horda de lobos');
  });

  it('should display the select of sex', function () {
    expect(element.all(by.css('div')).get(1).getText()).toBe('El heroe es mujer');
  });

});
