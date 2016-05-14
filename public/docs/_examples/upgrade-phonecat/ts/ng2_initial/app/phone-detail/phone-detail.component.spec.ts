// #docregion
import {Observable} from 'rxjs/Rx'
import './phone-detail.module';
import {Phone, PhoneData} from '../core/phone/phone.service';

describe('phoneDetail', function(){

    // Load the module that contains the `phoneDetail` component before each test
    beforeEach(angular.mock.module('phoneDetail'));

    // Supply a hand-instantianted instance of the Phone service
    beforeEach(angular.mock.module(function($provide) {
      $provide.value('phone', new Phone(null));
    }));

    // Test the controller
    describe('PhoneDetailController', function() {
      var $componentController, phone;
      var xyzPhoneData:PhoneData = {
        name: 'phone xyz',
        snippet: '',
        images: ['image/url1.png', 'image/url2.png']
      };

      beforeEach(inject(function(_$componentController_, _phone_, $routeParams) {
        $componentController = _$componentController_;
        phone = _phone_;
        $routeParams.phoneId = 'xyz';
      }));

      it('should fetch the phone details', function() {
        spyOn(phone, 'get').and.returnValue(Observable.of(xyzPhoneData));

        let ctrl = $componentController('phoneDetail', {$scope: {}});

        expect(phone.get).toHaveBeenCalledWith('xyz');
        expect(ctrl.phone).toEqual(xyzPhoneData);
      });

    });

});
