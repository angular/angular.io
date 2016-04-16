// #docregion
import {provide} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {
  describe,
  beforeEachProviders,
  inject,
  it,
  expect
} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';

import PhoneList from './phone-list.component';
import {Phone, PhoneData} from '../core/phone/phone.service';

class MockPhone extends Phone {
  query():Observable<PhoneData[]> {
    return Observable.of(
      [
        {name: 'Nexus S', snippet: '', images: []},
        {name: 'Motorola DROID', snippet: '', images: []}
      ]
    )
  }
}

describe('PhoneList', () => {

  beforeEachProviders(() => [
    provide(Phone, {useClass: MockPhone}),
    HTTP_PROVIDERS
  ]);

  it('should create "phones" model with 2 phones fetched from xhr',
      inject([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(PhoneList).then((fixture) => {
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('.phone-listing').length).toBe(2);
      expect(compiled.querySelector('.phone-listing:nth-child(1)').textContent).toContain('Nexus S');
      expect(compiled.querySelector('.phone-listing:nth-child(2)').textContent).toContain('Motorola DROID');
    });
  }));

  it('should set the default value of orderProp model',
      inject([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(PhoneList).then((fixture) => {
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('select option:last-child').selected).toBe(true);
    });
  }));

});
