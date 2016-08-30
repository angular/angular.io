'use strict'; // necessary for es6 output in node 

import { browser, element, by } from 'protractor';

describe('i18n E2E Tests', () => {

  beforeEach(function () {
    browser.get('');
  });

  it('should display i18n translated welcome: Bonjour i18n!', function () {
    expect(element(by.css('h1')).getText()).toEqual('Bonjour i18n!');
  });

});
