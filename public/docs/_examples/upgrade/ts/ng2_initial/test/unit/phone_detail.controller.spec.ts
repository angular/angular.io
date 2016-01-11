// #docregion
import {Observable} from 'rxjs';
import {describe, beforeEach, it} from 'angular2/testing';
import '../../app/js/phone_detail/phone_detail.module';
import {Phones} from '../../app/js/core/Phones';

import {FromObservable} from 'rxjs/observable/from';

describe('PhoneDetailCtrl', function(){
  var scope, phones, $controller,
      xyzPhoneData = function() {
        return {
          name: 'phone xyz',
          snippet: '',
          images: ['image/url1.png', 'image/url2.png']
        }
      };

  beforeEach(angular.mock.module('phonecat.detail'));

  // Supply a hand-instantianted instance of the Phones service
  beforeEach(angular.mock.module(function($provide) {
    $provide.factory('phones', function() {
      return new Phones(null);
    });
  }));

  beforeEach(inject(function(_phones_, _$controller_, $rootScope, $routeParams) {
    phones = _phones_;
    $controller = _$controller_;
    $routeParams.phoneId = 'xyz';
    scope = $rootScope.$new();
  }));


  it('should fetch phone detail', function() {
    spyOn(phones, 'get').and.returnValue(FromObservable.create([xyzPhoneData()]));

    let ctrl = $controller('PhoneDetailCtrl', {$scope: scope});

    expect(phones.get).toHaveBeenCalledWith('xyz');
    expect(ctrl.phone).toEqual(xyzPhoneData());
  });
});
