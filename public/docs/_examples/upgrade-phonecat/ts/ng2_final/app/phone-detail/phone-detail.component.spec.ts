// #docregion

import { provide } from '@angular/core';

// #docregion routeparams
import { RouteParams } from '@angular/router-deprecated';
// #enddocregion routeparams
import { HTTP_PROVIDERS } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import {
  describe,
  beforeEachProviders,
  inject,
  it,
  expect
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';

import PhoneDetail from './phone-detail.component';
import {Phone, PhoneData} from '../core/phone/phone.service';

function xyzPhoneData():PhoneData {
  return {
    name: 'phone xyz',
    snippet: '',
    images: ['image/url1.png', 'image/url2.png']
  }
}

class MockPhone extends Phone {
  get(id):Observable<PhoneData> {
    return Observable.of(xyzPhoneData());
  }
}

describe('PhoneDetail', () => {

  // #docregion routeparams
  beforeEachProviders(() => [
    provide(Phone, {useClass: MockPhone}),
    provide(RouteParams, {useValue: new RouteParams({phoneId: 'xyz'})}),
    HTTP_PROVIDERS
  ]);
  // #enddocregion routeparams

  it('should fetch phone detail', inject([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(PhoneDetail).then((fixture) => {
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1')).toHaveText(xyzPhoneData().name);
    });
  }));

});
