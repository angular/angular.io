// #docregion
var describe = ng.testing.describe,
  beforeEachProviders = ng.testing.beforeEachProviders,
  injectAsync = ng.testing.injectAsync,
  it = ng.testing.it,
  expect = ng.testing.expect,
  TestComponentBuilder = ng.testing.TestComponentBuilder;


function MockPhones() {
  this.query = function() {
    return Rx.Observable.from([
      [{name: 'Nexus S'}, {name: 'Motorola DROID'}]
    ]);
  };
}


describe('PhoneList', function(){

  beforeAll(function() {
    ng.platform.browser.BrowserDomAdapter.makeCurrent();
  });

  beforeEachProviders(function() {
    return [
      ng.core.provide(app.Phones, {useClass: MockPhones}),
      ng.http.HTTP_PROVIDERS
    ];
  });

  it('should create "phones" model with 2 phones fetched from xhr',
      injectAsync([TestComponentBuilder], function(tcb) {
    return tcb.createAsync(app.PhoneList).then(function(fixture) {
      fixture.detectChanges();

      var compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('.phone-listing').length).toBe(2);
      expect(compiled.querySelector('.phone-listing:nth-child(1)')).toHaveText('Nexus S');
      expect(compiled.querySelector('.phone-listing:nth-child(2)')).toHaveText('Motorola DROID');
    });
  }));

  it('should set the default value of orderProp model',
      injectAsync([TestComponentBuilder], function(tcb) {
    return tcb.createAsync(app.PhoneList).then(function(fixture) {
      fixture.detectChanges();
      var compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('select option:last-child').selected).toBe(true);
    });
  }));

});
