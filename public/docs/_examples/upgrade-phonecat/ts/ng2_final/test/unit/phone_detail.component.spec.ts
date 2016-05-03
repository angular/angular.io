import { provide } from '@angular/core';
// #docregion routeparams
import { RouteParams } from '@angular/router';
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

import PhoneDetail from '../../app/js/phone_detail/phone_detail.component';
import { Phones, Phone } from '../../app/js/core/phones.service';

function xyzPhoneData():Phone {
  return {
    name: 'phone xyz',
    snippet: '',
    images: ['image/url1.png', 'image/url2.png']
  }
}

class MockPhones extends Phones {
  get(id):Observable<Phone> {
    return Observable.of(xyzPhoneData());
  }
}

// #docregion routeparams
describe('PhoneDetail', () => {

  beforeEachProviders(() => [
    provide(Phones, {useClass: MockPhones}),
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
