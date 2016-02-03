// #docregion
var describe = ng.testing.describe,
  beforeEachProviders = ng.testing.beforeEachProviders,
  it = ng.testing.it,
  inject = ng.testing.inject;

describe('OrderByPipe', function() {

  var input = [
    {name: 'Nexus S', snippet: 'The Nexus S Phone', images: []},
    {name: 'Motorola DROID', snippet: 'An Android-for-business smartphone', images: []}
  ];

  beforeAll(function() {
    ng.platform.browser.BrowserDomAdapter.makeCurrent();
  });

  beforeEachProviders(function() {
    return [app.OrderByPipe];
  });

  it('should order by the given property', inject([app.OrderByPipe], function(orderByPipe) {
    expect(orderByPipe.transform(input, ['name'])).toEqual([input[1], input[0]]);
  }));

});
