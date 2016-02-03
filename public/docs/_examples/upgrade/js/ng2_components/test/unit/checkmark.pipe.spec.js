// #docregion
'use strict';

var describe = ng.testing.describe,
  beforeEachProviders = ng.testing.beforeEachProviders,
  it = ng.testing.it,
  inject = ng.testing.inject,
  expect = ng.testing.expect;

describe('CheckmarkPipe', function() {

  beforeAll(function() {
    ng.platform.browser.BrowserDomAdapter.makeCurrent();
  });
  
  beforeEachProviders(function() {
    return [app.CheckmarkPipe]
  });

  it('should convert boolean values to unicode checkmark or cross',
      inject([app.CheckmarkPipe], function(checkmarkPipe) {
    expect(checkmarkPipe.transform(true)).toBe('\u2713');
    expect(checkmarkPipe.transform(false)).toBe('\u2718');
  }));

});
