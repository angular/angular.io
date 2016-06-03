// #docregion routestuff
import { ApplicationRef } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import {
  ROUTER_PROVIDERS,
  ROUTER_PRIMARY_COMPONENT
} from '@angular/router-deprecated';
import { Observable } from 'rxjs/Rx';
import {
  describe,
  beforeEachProviders,
  inject,
  it,
  expect,
  MockApplicationRef
} from '@angular/core/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import {
  TestComponentBuilder,
  ComponentFixture
} from '@angular/compiler/testing';

import { AppComponent } from '../app.component';
import { PhoneListComponent } from './phone-list.component';
import { Phone, PhoneData } from '../core/phone/phone.service';

// #enddocregion routestuff


class MockPhone extends Phone {
  query():Observable<PhoneData[]> {
    return Observable.of([
      {name: 'Nexus S', snippet: '', images: []},
      {name: 'Motorola DROID', snippet: '', images: []}
    ])
  }
}

describe('PhoneList', () => {

  // #docregion routestuff

  beforeEachProviders(() => [
    { provide: Phone, useClass: MockPhone},
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    { provide: ApplicationRef, useClass: MockApplicationRef },
    { provide: ROUTER_PRIMARY_COMPONENT, useValue: AppComponent },
    { provide: LocationStrategy, useClass: MockLocationStrategy},
  ]);
  // #enddocregion routestuff

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
