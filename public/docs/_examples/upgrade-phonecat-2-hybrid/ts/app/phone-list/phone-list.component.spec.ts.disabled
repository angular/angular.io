// #docregion
import { HTTP_PROVIDERS } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {
  describe,
  beforeEachProviders,
  inject,
  it,
  expect
} from '@angular/core/testing';
import {
  TestComponentBuilder,
  ComponentFixture
} from '@angular/compiler/testing';

import { PhoneListComponent } from './phone-list.component';
import { Phone, PhoneData } from '../core/phone/phone.service';

class MockPhone extends Phone {
  query(): Observable<PhoneData[]> {
    console.log('mocking here');
    return Observable.of(
      [
        {name: 'Nexus S', snippet: '', images: []},
        {name: 'Motorola DROID', snippet: '', images: []}
      ]
    );
  }
}

describe('PhoneList', () => {

  beforeEachProviders(() => [
    { provide: Phone, useClass: MockPhone },
    HTTP_PROVIDERS
  ]);

  it('should create "phones" model with 2 phones fetched from xhr',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.createAsync(PhoneListComponent)
        .then((fixture: ComponentFixture<PhoneListComponent>) => {
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('.phone-list-item').length).toBe(2);
      expect(
        compiled.querySelector('.phone-list-item:nth-child(1)').textContent
      ).toContain('Motorola DROID');
      expect(
        compiled.querySelector('.phone-list-item:nth-child(2)').textContent
      ).toContain('Nexus S');
    });
  }));

  it('should set the default value of orderProp model',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.createAsync(PhoneListComponent)
        .then((fixture: ComponentFixture<PhoneListComponent>) => {
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(
        compiled.querySelector('select option:last-child').selected
      ).toBe(true);
    });
  }));

});
