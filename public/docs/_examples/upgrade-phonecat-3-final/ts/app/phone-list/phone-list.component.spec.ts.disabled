/* tslint:disable */
// #docregion routestuff
import { Directive } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {
  Router,
  RouterLink,
  RootRouter,
  RouteRegistry,
  ROUTER_PRIMARY_COMPONENT
} from '@angular/router-deprecated';
import { Observable } from 'rxjs/Rx';
import {
  describe,
  addProviders,
  inject,
  it,
  expect,
  // MockApplicationRef
} from '@angular/core/testing';
import { SpyLocation } from '@angular/common/testing';
import {
  TestComponentBuilder,
  ComponentFixture
} from '@angular/core/testing';

import { AppComponent } from '../app.component';
import { PhoneListComponent } from './phone-list.component';
import { Phone, PhoneData } from '../core/phone/phone.service';

// #enddocregion routestuff

@Directive({
  selector: '[routerLink]',
  inputs: ['routeParams: routerLink', 'target: target']
})
class RouterLinkMock {}

class MockPhone extends Phone {
  query(): Observable<PhoneData[]> {
    return Observable.of([
      {name: 'Nexus S', snippet: '', images: []},
      {name: 'Motorola DROID', snippet: '', images: []}
    ]);
  }
}

describe('PhoneList', () => {

  // #docregion routestuff

  addProviders([
    RouteRegistry,
    { provide: Router, useClass: RootRouter },
    { provide: ROUTER_PRIMARY_COMPONENT, useValue: AppComponent },
    { provide: Location, useClass: SpyLocation},
    { provide: Phone, useClass: MockPhone},
    HTTP_PROVIDERS
  ]);
  // #enddocregion routestuff

  it('should create "phones" model with 2 phones fetched from xhr',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb
    .overrideDirective(AppComponent, RouterLink, RouterLinkMock)
    .overrideDirective(PhoneListComponent, RouterLink, RouterLinkMock)
    .createAsync(PhoneListComponent)
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
    return tcb
      .overrideDirective(AppComponent, RouterLink, RouterLinkMock)
      .overrideDirective(PhoneListComponent, RouterLink, RouterLinkMock)
      .createAsync(PhoneListComponent)
        .then((fixture: ComponentFixture<PhoneListComponent>) => {
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(
        compiled.querySelector('select option:last-child').selected
      ).toBe(true);
    });
  }));

});
