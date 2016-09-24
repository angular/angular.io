// #docregion
import { HTTP_PROVIDERS } from '@angular/http';
// #docregion activatedroute
import { ActivatedRoute } from '@angular/router';

// #enddocregion activatedroute
import { Observable } from 'rxjs/Rx';

import {
  addProviders,
  inject,
} from '@angular/core/testing';
import {
  TestComponentBuilder,
  ComponentFixture
} from '@angular/compiler/testing';

import { PhoneDetailComponent } from './phone-detail.component';
import { Phone, PhoneData } from '../core/phone/phone.service';

function xyzPhoneData(): PhoneData {
  return {
    name: 'phone xyz',
    snippet: '',
    images: ['image/url1.png', 'image/url2.png']
  };
}

class MockPhone extends Phone {
  get(id: string): Observable<PhoneData> {
    return Observable.of(xyzPhoneData());
  }
}

// #docregion activatedroute

class ActivatedRouteMock {
  constructor(public snapshot: any) {}
}

// #enddocregion activatedroute

describe('PhoneDetailComponent', () => {

  // #docregion activatedroute

  beforeEach(() => {
    addProviders([
      { provide: Phone, useClass: MockPhone },
      { provide: ActivatedRoute, useValue: new ActivatedRouteMock({ params: { 'phoneId': 1 } }) },
      HTTP_PROVIDERS
    ]);
  });
  // #enddocregion activatedroute

  it('should fetch phone detail',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.createAsync(PhoneDetailComponent)
        .then((fixture: ComponentFixture<PhoneDetailComponent>) => {
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain(xyzPhoneData().name);
    });
  }));

});
