// #docregion
'use strict';

describe('PhoneDetailCtrl', function() {

  var ctrl,
      xyzPhoneData = function() {
        return {
          name: 'phone xyz',
              images: ['image/url1.png', 'image/url2.png']
        }
      };

  beforeEach(module('phonecat.detail'));

  // Supply a hand-instantianted instance of the Phones service
  beforeEach(angular.mock.module(function($provide) {
    $provide.factory('phones', function() {
      return new app.Phones(null);
    });
  }));

  beforeEach(inject(function(phones, $routeParams, $controller) {
    spyOn(phones, 'get').and.returnValue(Rx.Observable.from([xyzPhoneData()]));
    $routeParams.phoneId = 'xyz';
    ctrl = $controller('PhoneDetailCtrl');
  }));

  it('should fetch phone detail', function() {
    expect(ctrl.phone).toEqual(xyzPhoneData());
  });

});
