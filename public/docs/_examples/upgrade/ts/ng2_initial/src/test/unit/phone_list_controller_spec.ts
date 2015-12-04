// #docregion
import {Observable} from 'angular2/angular2';
import {describe, beforeEach, it} from 'angular2/testing';
import '../../app/phone_list/phone_list';
import {Phones} from '../../app/core/Phones';

describe('PhoneListCtrl', function(){
  var scope, ctrl, $httpBackend;

  beforeEach(angular.mock.module('phonecat.list'));

  // Supply a hand-instantianted instance of the Phones service
  beforeEach(angular.mock.module(function($provide) {
    $provide.factory('phones', function() {
      return new Phones(null);
    });
  }));

  beforeEach(inject(function(phones, $rootScope, $controller) {
    spyOn(phones, 'query').and.returnValue(Observable.from([
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
