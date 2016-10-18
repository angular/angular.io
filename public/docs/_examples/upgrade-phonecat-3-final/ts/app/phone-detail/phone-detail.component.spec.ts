// #docregion
import { HTTP_PROVIDERS } from '@angular/http';
// #docregion routeparams
import { RouteParams } from '@angular/router-deprecated';

// #enddocregion routeparams
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

describe('PhoneDetailComponent', () => {

  // #docregion routeparams

  beforeEachProviders(() => [
    { provide: Phone, useClass: MockPhone },
    { provide: RouteParams, useValue: new RouteParams({phoneId: 'xyz'})},
    HTTP_PROVIDERS
  ]);
  // #enddocregion routeparams

  it('should fetch phone detail',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.createAsync(PhoneDetailComponent)
        .then((fixture: ComponentFixture<PhoneDetailComponent>) => {
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1')).toHaveText(xyzPhoneData().name);
    });
  }));

});
