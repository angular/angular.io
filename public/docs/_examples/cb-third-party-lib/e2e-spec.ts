'use strict'; // necessary for es6 output in node 

import { browser, element, by } from 'protractor';

describe('Third Party Lib Cookbook', function () {

  let expectedMsgAoT = 'Library consumed by AoT application';
  let expectedMsgJiT = 'Library consumed by JiT application';

  beforeEach(function () {
    browser.get('');
  });

  it(`should load AoT compiled version`, function () {
    expect(element(by.css('.aot')).getText()).toEqual(expectedMsgAoT);
  });

  it('should load JiT compiled version', function () {
    expect(element(by.css('.jit')).getText()).toEqual(expectedMsgJiT);
  });

});
