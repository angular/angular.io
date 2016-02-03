// #docregion
'use strict';

var describe = ng.testing.describe,
  beforeEach = ng.testing.beforeEach,
  beforeEachProviders = ng.testing.beforeEachProviders,
  it = ng.testing.it;

describe('Phones', function() {

  // Activate Angular's DOM adapter
  beforeEach(function() {
    ng.platform.browser.BrowserDomAdapter.makeCurrent();
  });

  // Load providers
  beforeEachProviders(function() {
    return [app.Phones, ng.http.HTTP_PROVIDERS]
  });

  // Test service availability
  it('check the existence of Phones', ng.testing.inject([app.Phones], function(phones) {
    expect(phones).toBeDefined();
  }));

});
