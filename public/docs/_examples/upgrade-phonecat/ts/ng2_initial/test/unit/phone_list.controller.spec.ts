// #docregion
import {Observable} from 'rxjs/Rx';
import '../../app/js/phone_list/phone_list.module';
import {Phones} from '../../app/js/core/phones.service';

import 'rxjs/add/observable/fromArray';

describe('PhoneListCtrl', () => {
  var scope, ctrl, $httpBackend;

  beforeEach(angular.mock.module('phonecat.list'));

  // Supply a hand-instantianted instance of the Phones service
  beforeEach(angular.mock.module(function($provide) {
    $provide.factory('phones', function() {
      return new Phones(null);
    });
  }));

  beforeEach(inject(function(phones, $rootScope, $controller) {
    spyOn(phones, 'query').and.returnValue(Observable.fromArray([
      [{name: 'Nexus S'}, {name: 'Motorola DROID'}]
    ]));
    scope = $rootScope.$new();
    ctrl = $controller('PhoneListCtrl', {$scope: scope});
  }));


  it('should create "phones" model with 2 phones fetched from xhr', function() {
    expect(ctrl.phones).toEqual(
        [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
  });


  it('should set the default value of orderProp model', function() {
    expect(ctrl.orderProp).toBe('age');
  });
});
