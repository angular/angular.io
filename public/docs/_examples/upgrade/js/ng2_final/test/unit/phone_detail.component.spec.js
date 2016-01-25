// #docregion
var describe = ng.testing.describe,
  beforeEachProviders = ng.testing.beforeEachProviders,
  injectAsync = ng.testing.injectAsync,
  it = ng.testing.it,
  expect = ng.testing.expect,
  TestComponentBuilder = ng.testing.TestComponentBuilder;

function xyzPhoneData() {
  return {
    name: 'phone xyz',
    snippet: '',
    images: ['image/url1.png', 'image/url2.png']
  }
}


function MockPhones() {
  this.get = function(id) {
    return Rx.Observable.from([xyzPhoneData()]);
  };
}

describe('PhoneDetail', function() {

  beforeAll(function() {
    ng.platform.browser.BrowserDomAdapter.makeCurrent();
  });

  // #docregion beforeeachproviders
  beforeEachProviders(function() {
    return [
      ng.core.provide(app.Phones, {useClass: MockPhones}),
      ng.core.provide(ng.router.RouteParams, {useValue: new ng.router.RouteParams({phoneId: 'xyz'})}),
      ng.http.HTTP_PROVIDERS
    ];
  });
  // #enddocregion beforeeachproviders

  it('should fetch phone detail', injectAsync([TestComponentBuilder], function(tcb) {
    return tcb.createAsync(app.PhoneDetail).then(function(fixture) {
      fixture.detectChanges();
      var compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelector('.h1')).toHaveText(xyzPhoneData().name);
    });
  }));

});
