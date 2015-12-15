// #docregion
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs';
import {FromObservable} from 'rxjs/observable/from';

import {
  describe,
  beforeEachProviders,
  injectAsync,
  it,
  expect,
  TestComponentBuilder
} from 'angular2/testing';
import PhoneDetail from '../../app/js/phone_detail/PhoneDetail';
import {Phones, Phone} from '../../app/js/core/Phones';

function xyzPhoneData():Phone {
  return {
    name: 'phone xyz',
    snippet: '',
    images: ['image/url1.png', 'image/url2.png']
  }
}

class MockPhones extends Phones {
  get(id):Observable<Phone> {
    return FromObservable.create([xyzPhoneData()]);
  }
}

describe('PhoneDetail', function(){

  beforeEachProviders(() => [
    provide(Phones, {useClass: MockPhones}),
    provide('$routeParams', {useValue: {phoneId: 'xyz'}}),
    HTTP_PROVIDERS
  ]);

  it('should fetch phone detail', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(PhoneDetail).then((fixture) => {
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelector('.h1')).toHaveText(xyzPhoneData().name);
    });
  }));

});
