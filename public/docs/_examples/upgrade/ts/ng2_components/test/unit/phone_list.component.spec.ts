// #docregion
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/fromArray';

import {
  describe,
  beforeEachProviders,
  injectAsync,
  it,
  expect,
  TestComponentBuilder
} from 'angular2/testing';
import PhoneList from '../../app/js/phone_list/phone_list.component';
import {Phones, Phone} from '../../app/js/core/phones.service';

class MockPhones extends Phones {
  query():Observable<Phone[]> {
    return Observable.fromArray([
      [{name: 'Nexus S'}, {name: 'Motorola DROID'}]
    ])
  }
}

describe('PhoneList', () => {

  beforeEachProviders(() => [
    provide(Phones, {useClass: MockPhones}),
    HTTP_PROVIDERS
  ]);


  it('should create "phones" model with 2 phones fetched from xhr',
      injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(PhoneList).then((fixture) => {
      fixture.detectChanges();

      let compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('.phone-listing').length).toBe(2);
      expect(compiled.querySelector('.phone-listing:nth-child(1)').textContent).toContain('Nexus S');
      expect(compiled.querySelector('.phone-listing:nth-child(2)').textContent).toContain('Motorola DROID');
    });
  }));


  it('should set the default value of orderProp model',
      injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(PhoneList).then((fixture) => {
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('select option:last-child').selected).toBe(true);
    });
  }));

});
