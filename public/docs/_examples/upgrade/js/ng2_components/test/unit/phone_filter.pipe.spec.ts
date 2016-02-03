// #docregion
var describe = ng.testing.describe,
  beforeEachProviders = ng.testing.beforeEachProviders,
  it = ng.testing.it
  inject = ng.testing.inject;

describe('PhoneFilterPipe', function() {

  var phones = [
    {name: 'Nexus S', snippet: 'The Nexus S Phone', images: []},
    {name: 'Motorola DROID', snippet: 'an Android-for-business smartphone', images: []}
  ];

  beforeAll(function() {
    ng.platform.browser.BrowserDomAdapter.makeCurrent();
  });

  beforeEachProviders(function() {
    return [app.PhoneFilterPipe]
  });

  it('should return input when no query', inject([app.PhoneFilterPipe], function(phoneFilterPipe) {
    expect(phoneFilterPipe.transform(phones, [])).toEqual(phones);
  }));

  it('should match based on name', inject([app.PhoneFilterPipe], function(phoneFilterPipe) {
    expect(phoneFilterPipe.transform(phones, ['nexus'])).toEqual([phones[0]]);
  }));

  it('should match based on snippet', inject([app.PhoneFilterPipe], function(phoneFilterPipe) {
    expect(phoneFilterPipe.transform(phones, ['android'])).toEqual([phones[1]]);
  }));

});
