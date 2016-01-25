// #docregion
'use strict';

describe('PhoneListCtrl', function(){
  var ctrl, $httpBackend;

  beforeEach(module('phonecat.list'));

  // Supply a hand-instantianted instance of the Phones service
  beforeEach(angular.mock.module(function($provide) {
    $provide.factory('phones', function() {
      return new app.Phones(null);
    });
  }));

  beforeEach(inject(function(_phones_, $controller) {
    spyOn(_phones_, 'query').and.returnValue(Rx.Observable.from([
      [{name: 'Nexus S'}, {name: 'Motorola DROID'}]
    ]));
    ctrl = $controller('PhoneListCtrl');
  }));

  it('should create "phones" model with 2 phones fetched from xhr', function() {
    expect(ctrl.phones).toEqual(
        [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
  });

  it('should set the default value of orderProp model', function() {
    expect(ctrl.orderProp).toBe('age');
  });
});
